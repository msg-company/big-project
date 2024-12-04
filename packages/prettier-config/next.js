module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  importOrder: [
    "^react",
    "^next",
    "^@/components/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/styles/(.*)$",
    "^@/(.*)$",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports"
  ]
};
