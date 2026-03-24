#!/usr/bin/env node
/**
 * Build-time script that reads the design-system-docs skill
 * and generates component registry + design tokens JSON files.
 *
 * Runs on every build via the "prebuild" npm script.
 * This enables updating component behavior by editing the skill docs.
 */

const fs = require("fs");
const path = require("path");

const SKILL_PATH = path.join(__dirname, "..", ".claude", "skills", "design-system-docs.md");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "lib", "generated");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function parseDesignTokens(content) {
  const tokens = { colors: {}, typography: {}, spacing: {}, borderRadius: {} };

  // Parse color tokens
  const colorSection = content.match(/### Colors\n\|.*\n\|.*\n([\s\S]*?)(?=\n###|\n---)/);
  if (colorSection) {
    const rows = colorSection[1].trim().split("\n");
    for (const row of rows) {
      const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
      if (cols.length >= 4) {
        const token = cols[0];
        tokens.colors[token] = { light: cols[1], dark: cols[2], figmaNode: cols[3] };
      }
    }
  }

  // Parse typography tokens
  const typoSection = content.match(/### Typography\n\|.*\n\|.*\n([\s\S]*?)(?=\n###|\n---)/);
  if (typoSection) {
    const rows = typoSection[1].trim().split("\n");
    for (const row of rows) {
      const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        tokens.typography[cols[0]] = { value: cols[1], figmaNode: cols[2] };
      }
    }
  }

  // Parse spacing tokens
  const spacingSection = content.match(/### Spacing\n\|.*\n\|.*\n([\s\S]*?)(?=\n###|\n---)/);
  if (spacingSection) {
    const rows = spacingSection[1].trim().split("\n");
    for (const row of rows) {
      const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
      if (cols.length >= 2) {
        tokens.spacing[cols[0]] = cols[1];
      }
    }
  }

  // Parse border radius tokens
  const radiusSection = content.match(/### Border Radius\n\|.*\n\|.*\n([\s\S]*?)(?=\n###|\n---|\n\n##)/);
  if (radiusSection) {
    const rows = radiusSection[1].trim().split("\n");
    for (const row of rows) {
      const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
      if (cols.length >= 2) {
        tokens.borderRadius[cols[0]] = cols[1];
      }
    }
  }

  return tokens;
}

function parseComponents(content) {
  const components = [];
  const componentRegex = /#### (\w+)\n([\s\S]*?)(?=\n####|\n### (?!.*Props|.*Behavior)|---|\n## (?!.*Component))/g;
  let match;

  while ((match = componentRegex.exec(content)) !== null) {
    const name = match[1];
    const block = match[2];

    const component = { name, category: "", figmaNode: "", variants: [], sizes: [], states: [], props: [], behavior: "" };

    // Figma node
    const nodeMatch = block.match(/\*\*Figma Node\*\*:\s*`([^`]+)`/);
    if (nodeMatch) component.figmaNode = nodeMatch[1];

    // Variants
    const varMatch = block.match(/\*\*Variants\*\*:\s*([^\n]+)/);
    if (varMatch) component.variants = varMatch[1].split(",").map((v) => v.trim().replace(/`/g, ""));

    // Sizes
    const sizeMatch = block.match(/\*\*Sizes\*\*:\s*([^\n]+)/);
    if (sizeMatch) component.sizes = sizeMatch[1].split(",").map((s) => s.trim().replace(/`/g, "").replace(/\s*\([^)]*\)/g, ""));

    // States
    const stateMatch = block.match(/\*\*States\*\*:\s*([^\n]+)/);
    if (stateMatch) component.states = stateMatch[1].split(",").map((s) => s.trim().replace(/`/g, ""));

    // Props
    const propsMatch = block.match(/\*\*Props\*\*:\n([\s\S]*?)(?=\n- \*\*Behavior|$)/);
    if (propsMatch) {
      const propLines = propsMatch[1].split("\n").filter((l) => l.trim().startsWith("- `"));
      for (const line of propLines) {
        const propMatch = line.match(/- `(\w+)`:\s*([^(]+?)(?:\s*\(([^)]*)\))?$/);
        if (propMatch) {
          component.props.push({
            name: propMatch[1],
            type: propMatch[2].trim(),
            description: propMatch[3] ? propMatch[3].trim() : "",
          });
        }
      }
    }

    // Behavior
    const behavMatch = block.match(/\*\*Behavior\*\*:\s*([^\n]+)/);
    if (behavMatch) component.behavior = behavMatch[1];

    components.push(component);
  }

  // Assign categories based on section headers
  const atomsStart = content.indexOf("### Atoms");
  const molStart = content.indexOf("### Molecules");
  const orgStart = content.indexOf("### Organisms");
  const tempStart = content.indexOf("### Templates");

  for (const comp of components) {
    const compPos = content.indexOf(`#### ${comp.name}`);
    if (compPos >= tempStart && tempStart > 0) comp.category = "templates";
    else if (compPos >= orgStart && orgStart > 0) comp.category = "organisms";
    else if (compPos >= molStart && molStart > 0) comp.category = "molecules";
    else if (compPos >= atomsStart && atomsStart > 0) comp.category = "atoms";
  }

  return components;
}

function parseNavigation(content) {
  const navSection = content.match(/## Atomic Design Navigation Structure\n```([\s\S]*?)```/);
  if (!navSection) return [];

  const categories = [];
  let currentCategory = null;
  const lines = navSection[1].trim().split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("├") && !trimmed.startsWith("└") && trimmed.length > 0) {
      currentCategory = { title: trimmed, items: [] };
      categories.push(currentCategory);
    } else if (currentCategory) {
      const name = trimmed.replace(/[├└─│\s]/g, "").trim();
      if (name) {
        currentCategory.items.push({
          id: name.toLowerCase().replace(/\s+/g, "-"),
          label: name,
        });
      }
    }
  }

  return categories;
}

function parseFigmaConfig(content) {
  const fileKeyMatch = content.match(/\*\*Figma File\*\*:\s*`([^`]+)`/);
  const apiMatch = content.match(/GET https:\/\/api\.figma\.com\/v1\/files\/\{fileKey\}\/nodes\?ids=\{nodeId\}/);

  return {
    fileKey: fileKeyMatch ? fileKeyMatch[1] : "",
    apiBase: "https://api.figma.com/v1",
    apiRoute: "/api/figma",
  };
}

function main() {
  console.log("[design-system] Loading design-system-docs skill...");

  if (!fs.existsSync(SKILL_PATH)) {
    console.warn("[design-system] Skill file not found at:", SKILL_PATH);
    console.warn("[design-system] Using defaults.");
    ensureDir(OUTPUT_DIR);
    fs.writeFileSync(path.join(OUTPUT_DIR, "component-registry.json"), JSON.stringify({ components: [], navigation: [], figma: {} }, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "design-tokens.json"), JSON.stringify({ colors: {}, typography: {}, spacing: {}, borderRadius: {} }, null, 2));
    return;
  }

  const content = fs.readFileSync(SKILL_PATH, "utf-8");
  console.log("[design-system] Parsing design tokens...");
  const tokens = parseDesignTokens(content);

  console.log("[design-system] Parsing component registry...");
  const components = parseComponents(content);
  const navigation = parseNavigation(content);
  const figma = parseFigmaConfig(content);

  // Parse version
  const versionMatch = content.match(/Current version:\s*([^\n]+)/);
  const updatedMatch = content.match(/Last updated:\s*([^\n]+)/);

  ensureDir(OUTPUT_DIR);

  const registry = {
    version: versionMatch ? versionMatch[1].trim() : "0.0.0",
    lastUpdated: updatedMatch ? updatedMatch[1].trim() : new Date().toISOString(),
    figma,
    navigation,
    components,
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "component-registry.json"), JSON.stringify(registry, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, "design-tokens.json"), JSON.stringify(tokens, null, 2));

  console.log(`[design-system] Generated ${components.length} components, ${Object.keys(tokens.colors).length} color tokens`);
  console.log("[design-system] Output: src/lib/generated/");
}

main();
