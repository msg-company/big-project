module.exports = {
  extends: ['@repo/stylelint-config'],
  // Дополнительные правила специфичные для SSO проекта
  rules: {
    // Разрешаем использование CSS модулей
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    // Отключаем предупреждение о пустых файлах стилей
    'no-empty-source': null,
    // Разрешаем использование глобальных стилей
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
