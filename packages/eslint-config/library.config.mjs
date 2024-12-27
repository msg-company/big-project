import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import perfectionistNatural from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/node_modules", "**/.turbo", "**/.next"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionistNatural,
  {
    plugins: {
      unicorn,
      import: importPlugin,
    },
    rules: {
      // TypeScript Rules
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",

      // Import Rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      // Unicorn Rules
      "unicorn/better-regex": "error",
      "unicorn/no-null": "error",
      "unicorn/prefer-module": "error",

      // General Best Practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      complexity: ["error", 10],
      "max-lines-per-function": ["error", 50],

      // Perfectionist Plugin Rules
      "perfectionist/sort-interfaces": "error",
      "perfectionist/sort-objects": "error",
    },
  },
  prettier,
);
