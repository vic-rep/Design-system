/**
 * Figma REST API client for retrieving design specs.
 * Uses the server-side API route to proxy requests to Figma.
 */

const FIGMA_FILE_KEY = "nG8PGu5CclffafrfZuMG9G";
const FIGMA_API_BASE = "https://api.figma.com/v1";

export interface FigmaNodeData {
  document: Record<string, unknown>;
  components: Record<string, unknown>;
  styles: Record<string, unknown>;
}

/**
 * Fetch a Figma node's design spec via the local API proxy.
 * Used client-side to retrieve specs for component previews.
 */
export async function fetchFigmaNode(nodeId: string): Promise<FigmaNodeData | null> {
  try {
    const res = await fetch(`/api/figma/${encodeURIComponent(nodeId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.nodes?.[nodeId] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch directly from Figma API (server-side only).
 * Used by the build script and API routes.
 */
export async function fetchFigmaNodeDirect(
  nodeId: string,
  token: string,
): Promise<FigmaNodeData | null> {
  try {
    const res = await fetch(
      `${FIGMA_API_BASE}/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}`,
      { headers: { "X-Figma-Token": token } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.nodes?.[nodeId] ?? null;
  } catch {
    return null;
  }
}

/**
 * Build a Figma URL for a specific node.
 */
export function getFigmaUrl(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}/Design-System-Rebuild?node-id=${nodeId.replace(":", "-")}`;
}
