module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-organize-attributes'],
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
