module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: false,
  printWidth: 180,
  tabWidth: 2,
  arrowParens: 'avoid',
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-organize-attributes'],
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        tabWidth: 2,
        printWidth: 80,
        singleQuote: false,
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'babel-ts'
      },
    },
  ],
};
