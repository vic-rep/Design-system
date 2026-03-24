import { NextRequest, NextResponse } from "next/server";

const FIGMA_API = "https://api.figma.com/v1";
const FILE_KEY = "nG8PGu5CclffafrfZuMG9G";

export async function GET(
  request: NextRequest,
  { params }: { params: { nodeId: string } },
) {
  const token = process.env.FIGMA_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "FIGMA_ACCESS_TOKEN not configured" },
      { status: 500 },
    );
  }

  const nodeId = decodeURIComponent(params.nodeId);

  try {
    const response = await fetch(
      `${FIGMA_API}/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}`,
      {
        headers: { "X-Figma-Token": token },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Figma API error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Figma API" },
      { status: 502 },
    );
  }
}
