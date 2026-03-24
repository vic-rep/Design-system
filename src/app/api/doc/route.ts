import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
  }

  // Only allow reading from .claude/skills/docs
  if (!path.startsWith(".claude/skills/")) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const fullPath = join(process.cwd(), path);
    const content = await readFile(fullPath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
