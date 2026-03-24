#!/usr/bin/env node
/**
 * Build-time script that reads the Trusti design system docs
 * and generates component registry + design tokens JSON files.
 *
 * Reads from .claude/skills/docs/ (the new doc structure)
 * as well as the legacy design-system-docs.md for backwards compat.
 *
 * Runs on every build via the "prebuild" npm script.
 */

const fs = require("fs");
const path = require("path");

const DOCS_DIR = path.join(__dirname, "..", ".claude", "skills", "docs");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "lib", "generated");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readDocsDirectory() {
  const inventory = {
    foundations: [],
    molecules: [],
    organisms: [],
    templates: [],
  };

  for (const level of Object.keys(inventory)) {
    const levelDir = path.join(DOCS_DIR, level);
    if (fs.existsSync(levelDir)) {
      const files = fs.readdirSync(levelDir).filter((f) => f.endsWith(".md"));
      for (const file of files) {
        const content = fs.readFileSync(path.join(levelDir, file), "utf-8");
        const name = file.replace(".md", "");

        // Extract Figma node
        const figmaMatch = content.match(/\*\*Figma:\*\*\s*(?:Page\s*)?`?(\d+:\d+)`?/);
        const figmaNode = figmaMatch ? figmaMatch[1] : "";

        // Extract type badge
        const typeMatch = content.match(/\|\s*(.*?)\s*\|/);
        const type = typeMatch ? typeMatch[1].trim() : level;

        inventory[level].push({
          name,
          displayName: name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          level,
          type,
          figmaNode,
          docPath: `.claude/skills/docs/${level}/${file}`,
        });
      }
    }
  }

  return inventory;
}

function buildTokens() {
  // Tokens are now defined directly in globals.css from Figma API data.
  // This file generates a JSON reference for programmatic access.
  return {
    colors: {
      accent: {
        900: "#602901", 800: "#923E02", 700: "#C55302", 600: "#F76803",
        500: "#FC7D21", 400: "#FD9A54", 300: "#FEB886", 200: "#FED5B8", 100: "#FFF3EB",
      },
      primary: {
        900: "#191919", 800: "#333333", 700: "#4d4d4d", 600: "#666666",
        500: "#808080", 400: "#999999", 300: "#cccccc", 200: "#e6e6e6", 100: "#f0f0f0",
      },
      surface: { DEFAULT: "#F3F2F0", adjacent: "#FFFFFF", "adjacent-2": "#E1E5EB" },
      success: { 800: "#006632", 700: "#009147", 100: "#E6F4ED" },
      warning: { 600: "#B86700", 500: "#E98300", 100: "#FFE0B8" },
      destructive: { 600: "#CC001B", 550: "#FF0022", 100: "#FFE6E9" },
    },
    typography: {
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
      weights: { regular: 400, medium: 500, semibold: 600 },
      desktop: {
        h1: "48px/1.2 600", h2: "40px/1.2 600", h3: "36px/1.2 600",
        h4: "32px/1.2 600", h5: "24px/1.2 500", h6: "20px/1.2 500",
        textLarge: "18px/1.2 400", textDefault: "16px/1.2 400",
        textDefaultM: "16px/1.2 500", textSmall: "14px/1.2 400", caption: "12px/1.2 400",
      },
      mobile: {
        h1: "32px/1.2 600", h2: "28px/1.2 600", h3: "24px/1.2 600",
        h4: "20px/1.2 600", h5: "18px/1.2 500", h6: "16px/1.2 500",
        textLarge: "16px/1.2 400", textDefault: "14px/1.2 400",
        textDefaultM: "14px/1.2 500", textSmall: "12px/1.3 400", caption: "10px/1.3 400",
      },
    },
    spacing: {
      none: "0px", xxs: "2px", xs: "4px", s: "8px", m: "12px",
      l: "16px", xl: "20px", xxl: "24px", "3xl": "28px", "4xl": "32px",
      "5xl": "40px", "6xl": "48px", "7xl": "64px", "8xl": "80px", max: "128px",
    },
    borderRadius: { sm: "4px", md: "6px", lg: "8px", xl: "12px", full: "9999px" },
    elevation: {
      level1: "cards, raised surfaces",
      level2: "dropdowns, hover states",
      level3: "toasts, tooltips",
      level4: "modals, dialogs",
      level5: "drawers, full overlays",
    },
  };
}

function main() {
  console.log("[trusti-ds] Loading design system documentation...");

  ensureDir(OUTPUT_DIR);

  const inventory = readDocsDirectory();
  const tokens = buildTokens();

  const totalComponents =
    inventory.foundations.length +
    inventory.molecules.length +
    inventory.organisms.length +
    inventory.templates.length;

  const registry = {
    version: "1.0.0",
    lastUpdated: new Date().toISOString().split("T")[0],
    figma: {
      fileKey: "nG8PGu5CclffafrfZuMG9G",
      apiBase: "https://api.figma.com/v1",
      apiRoute: "/api/figma",
    },
    inventory,
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "component-registry.json"), JSON.stringify(registry, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, "design-tokens.json"), JSON.stringify(tokens, null, 2));

  console.log(`[trusti-ds] Generated registry: ${totalComponents} components across 4 levels`);
  console.log(`[trusti-ds]   Foundations: ${inventory.foundations.length}`);
  console.log(`[trusti-ds]   Molecules: ${inventory.molecules.length}`);
  console.log(`[trusti-ds]   Organisms: ${inventory.organisms.length}`);
  console.log(`[trusti-ds]   Templates: ${inventory.templates.length}`);
  console.log("[trusti-ds] Output: src/lib/generated/");
}

main();
