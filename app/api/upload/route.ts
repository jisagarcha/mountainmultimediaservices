import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 10 MB Max File Size Limit
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10 MB limit" }, { status: 400 });
    }

    // Extension & MIME-type whitelist check
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
    const rawExt = path.extname(file.name).toLowerCase();
    const ext = allowedExtensions.includes(rawExt) ? rawExt : ".png";

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
    if (file.type && !allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique sanitized filename (prevents path traversal attacks)
    const sanitizedBase = path.basename(file.name, rawExt).replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `${Date.now()}-${sanitizedBase || "upload"}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    // Save to persistent data/uploads (survives Docker restarts) and public/uploads
    const dataUploadsDir = path.join(process.cwd(), "data", "uploads");
    const publicUploadsDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(dataUploadsDir, { recursive: true });
    await fs.mkdir(publicUploadsDir, { recursive: true });

    await fs.writeFile(path.join(dataUploadsDir, filename), buffer);
    await fs.writeFile(path.join(publicUploadsDir, filename), buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl, filename });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload file" }, { status: 500 });
  }
}
