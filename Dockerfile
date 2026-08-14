FROM node:22-alpine AS base

# Install build dependencies for native C++ modules (better-sqlite3)
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Rebuild Next.js app in standalone mode
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN yarn build

# Production runner image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_PATH="/app/data/app.db"

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create data directory for SQLite persistence
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Copy built standalone assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy better-sqlite3 native modules into standalone node_modules
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
COPY --from=builder /app/node_modules/bindings ./node_modules/bindings
COPY --from=builder /app/node_modules/file-uri-to-path ./node_modules/file-uri-to-path

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
