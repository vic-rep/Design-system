import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "atoms/index": "src/components/atoms/index.ts",
    "molecules/index": "src/components/molecules/index.ts",
    "organisms/index": "src/components/organisms/index.ts",
    "templates/index": "src/components/templates/index.ts",
    "theme/index": "src/lib/theme.tsx",
  },
  tsconfig: "tsconfig.build.json",
  format: ["esm", "cjs"],
  dts: {
    tsconfig: "tsconfig.build.json",
  },
  splitting: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom", "next"],
  banner: {
    js: '"use client";',
  },
});
