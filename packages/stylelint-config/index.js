module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-prettier',
    'stylelint-config-css-modules',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-strict-value',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,

    // Правила для сортировки CSS свойств
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex',
      'flex-direction',
      'flex-wrap',
      'gap',
      'justify-content',
      'align-items',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'border',
      'border-radius',
      'background',
      'color',
      'font-family',
      'font-size',
      'font-weight',
      'line-height',
      'text-align',
      'transform',
      'transition',
    ],

    // Базовые правила
    'declaration-no-important': true,
    'selector-max-specificity': '0,3,3',
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'shorthand-property-no-redundant-values': true,

    // Ограничения для улучшения производительности
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 4,

    // Правила для медиа-запросов
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': true,

    // Правила для анимаций и переходов
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9]+$',
    'time-min-milliseconds': 100,

    // Правила для префиксов
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,

    // Правила для единиц измерения
    'unit-allowed-list': [
      'px',
      'em',
      'rem',
      '%',
      'vh',
      'vw',
      'svh',
      'dvh',
      'deg',
      's',
      'ms',
      'fr',
      'vmin',
      'vmax',
      'ch',
    ],

    // Правила для цветов
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-function-notation': 'modern',

    // Правила для шрифтов
    'font-weight-notation': 'numeric',
    'font-family-name-quotes': 'always-where-required',

    // Правила для z-index и других важных свойств
    'scale-unlimited/declaration-strict-value': [
      ['/color/', 'z-index', 'font-family'],
      {
        ignoreValues: ['transparent', 'inherit', 'unset', 'initial', 'currentColor', 'none'],
      },
    ],

    // Убираем строгие ограничения для grid-template
    'declaration-property-value-allowed-list': null,
  },

  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**',
    '**/*.min.css',
  ],

  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
};
