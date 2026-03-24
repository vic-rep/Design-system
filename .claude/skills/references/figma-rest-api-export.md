# Figma REST API Export — Reference

This reference documents the REST API export strategy for discovering Figma file structure
without consuming MCP call budget. It includes the HTML tool template, expected JSON output
schema, and instructions for parsing and using the export data.

---

## When to use this strategy

Use the REST API export when:
- The Figma file is large (30+ pages) and `get_metadata` on `0:1` times out
- MCP rate limits are exhausted or approaching exhaustion
- You need the full file map (all pages, all components, all styles) upfront
- The user wants to document multiple components across the file

Do NOT use this strategy when:
- The user shared a link to a specific component node — just call `get_design_context` directly
- The file is small and `get_metadata` returns the full structure on the first call
- The user has already provided the structure via screenshot or text

---

## Workflow

### Step 1: Generate the HTML export tool

Create a standalone HTML file that the user opens in their browser. The tool makes three
Figma REST API calls using the user's Personal Access Token:

1. `GET /v1/files/:fileKey?depth=N` — Returns the full page/node tree (N = 2–4)
2. `GET /v1/files/:fileKey/variables/local` — Returns all local variable collections
   (requires `file_variables:read` scope — may 403 on older tokens)
3. `GET /v1/files/:fileKey/styles` — Returns all published text, color, grid, effect styles

The tool composes all three responses into a single JSON export and offers a download button.

### Step 2: User runs the tool and uploads the JSON

The user opens the HTML file in any browser, enters their token and file key (pre-fill these
if known from the conversation), clicks Export, and uploads the resulting JSON back to the
conversation.

### Step 3: Parse the JSON and build the component inventory

Use the parsing guide below to extract the file structure, classify pages by atomic level,
and identify all documentable components with their node IDs.

### Step 4: Use MCP for variable values (if needed)

If the JSON export includes `variables` data (token had `file_variables:read` scope), you
have the full variable set. If `variables` is `null`, use MCP `get_variable_defs` on specific
foundation page nodes — the JSON gives you the exact node IDs to target, so no calls are
wasted on discovery.

---

## HTML tool template

When generating the export tool, include these features:

**Required:**
- Token input field (type=password)
- File key input field (pre-fill from conversation context)
- Depth selector (2, 3, or 4 — default 2 for initial discovery, 3 for documentation)
- Export button that runs all three API calls in sequence
- Log area showing progress and results
- Download button for the JSON output
- Graceful handling of the variables 403 (skip and continue, don't crash)

**Nice to have:**
- Pre-filled token if the user has shared one
- Component inventory count in the log
- Style breakdown by type in the log
- File size of the export in the log
- Reminder to upload the JSON back to Claude
- Security reminder to revoke/regenerate the token afterward

**API call error handling:**
- Variables endpoint 403 → Log warning, set `variables: null`, continue
- Any other 4xx/5xx → Log error with status and message, stop
- Network error → Log error, suggest checking internet connection

**The tool template code is generated dynamically by Claude** based on the conversation context.
Do not store a static HTML file in the skill — generate it fresh each time so it can be
pre-filled with the correct file key and token from the current conversation.

---

## JSON export schema

```json
{
  "_export": {
    "tool": "figma-structure-exporter",
    "exportedAt": "ISO 8601 timestamp",
    "fileKey": "string",
    "fileName": "string",
    "depth": 2,
    "hasVariables": false
  },
  "fileStructure": {
    "name": "string",
    "lastModified": "ISO 8601 timestamp",
    "version": "string",
    "pages": [
      {
        "id": "0:1",
        "name": "Page Name",
        "type": "CANVAS",
        "childCount": 5,
        "children": [
          {
            "id": "78:9146",
            "name": "Section Name",
            "type": "SECTION | FRAME | COMPONENT | COMPONENT_SET | ...",
            "childCount": 12,
            "width": 1440,
            "height": 900,
            "children": []
          }
        ]
      }
    ]
  },
  "variables": null | {
    "collections": [
      {
        "id": "string",
        "name": "Collection Name",
        "modes": [{ "modeId": "string", "name": "Mode Name" }],
        "defaultModeId": "string",
        "variables": [
          {
            "id": "string",
            "name": "token/path/name",
            "resolvedType": "COLOR | FLOAT | STRING | BOOLEAN",
            "description": "",
            "hiddenFromPublishing": false,
            "scopes": ["ALL_SCOPES"],
            "codeSyntax": {},
            "valuesByMode": {
              "modeId": "value (hex for COLOR, number for FLOAT, etc.)"
            }
          }
        ]
      }
    ]
  },
  "publishedStyles": [
    {
      "key": "string",
      "name": "Style Name",
      "style_type": "TEXT | FILL | EFFECT | GRID",
      "node_id": "26:32",
      "description": ""
    }
  ],
  "componentInventory": [
    {
      "id": "390:342",
      "name": "Component Name",
      "type": "COMPONENT | COMPONENT_SET",
      "description": ""
    }
  ]
}
```

---

## Parsing instructions

### Building the page inventory from JSON

```
For each page in fileStructure.pages:
  1. Check page.name against atomic level keywords (see SKILL.md "After discovery" section)
  2. If the page is a divider (name is "---", "----", "--------", etc.) → skip
  3. If the page is a section header (name matches "⚛ Atoms", "🧪 Molecules", etc.)
     → record the current atomic level context for subsequent pages
  4. If the page has an ❖ prefix → it's a component/foundation page under the current
     atomic level context
  5. For each child in the page, record: id, name, type
     - SECTION children are documentation frames (the main content)
     - COMPONENT / COMPONENT_SET children are documentable components
     - FRAME children may be variants, examples, or documentation mockups
```

### Identifying foundation pages vs component pages

Foundation pages (Grids, Typography, Colors, Icons, Spacings & Sizing, Elevation) contain
design tokens and primitives. They typically:
- Live under the "⚛ Atoms" section header
- Have `❖` prefix in their page name
- Contain SECTION-type children with specimen frames, not interactive components
- Have few or no COMPONENT/COMPONENT_SET children

Component pages contain documentable interactive elements. They typically:
- Have COMPONENT or COMPONENT_SET children
- Or have SECTION children that themselves contain components (check `childCount`)

### Using publishedStyles for cross-referencing

Published styles have `node_id` values that can be used with MCP `get_variable_defs` to
extract the actual token values. Group styles by `style_type`:
- `TEXT` → typography tokens
- `FILL` → color tokens
- `EFFECT` → elevation/shadow tokens
- `GRID` → grid/layout tokens

### Using componentInventory

The component inventory is a flat list of all COMPONENT and COMPONENT_SET nodes in the file.
Use it to:
- Count total documentable components
- Cross-reference with page structure to determine which page each component lives on
- Identify component sets (which have variants) vs standalone components

---

## Variable extraction fallback

When the JSON export does NOT include variables (token missing `file_variables:read` scope):

1. **Identify foundation page node IDs from the JSON** — look for pages named Typography,
   Colors, Spacings, Elevation, etc. and note their child section node IDs.
2. **Call MCP `get_variable_defs` on each foundation section node** — one call per foundation
   page. This returns all variables applied to that node.
3. **For component-level variables**, call `get_variable_defs` on the specific component node
   when documenting it (as part of the Step 0b budget of 1–2 calls per component).

This approach gives you complete variable coverage with targeted MCP calls instead of
the shotgun approach of calling `get_metadata` on every node.

**If the user can regenerate their token** with `file_variables:read` scope, suggest they do so
and re-run the export tool. This gives the complete variable set in one JSON file with zero
MCP calls needed for variables.

---

## Security notes

- Figma Personal Access Tokens are sensitive credentials. If the user pastes a token in chat,
  remind them to **revoke and regenerate it** after the export is complete.
- The HTML tool runs entirely client-side — no data is sent to any server other than Figma's API.
- Token values should never be stored in skill files, reference documents, or memory.
