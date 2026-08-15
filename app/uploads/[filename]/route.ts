import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Prevent path traversal attacks
    const safeFilename = path.basename(filename);

    // Look up file in persistent data/uploads first, then public/uploads
    const dataPath = path.join(process.cwd(), "data", "uploads", safeFilename);
    const publicPath = path.join(process.cwd(), "public", "uploads", safeFilename);

    let fileBuffer: Buffer | null = null;

    try {
      fileBuffer = await fs.readFile(dataPath);
    } catch {
      try {
        fileBuffer = await fs.readFile(publicPath);
      } catch {
        fileBuffer = null;
      }
    }

    if (!fileBuffer) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    // Determine Content-Type
    const ext = path.extname(safeFilename).toLowerCase();
    let contentType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".gif") contentType = "image/gif";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
