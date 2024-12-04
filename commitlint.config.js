module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // новая функциональность
        'fix',      // исправление багов
        'docs',     // документация
        'style',    // форматирование, отступы и т.д.
        'refactor', // рефакторинг кода
        'perf',     // улучшение производительности
        'test',     // добавление тестов
        'chore',    // обслуживание кода
        'revert',   // откат изменений
        'build',    // сборка проекта или изменения внешних зависимостей
        'ci',       // настройка CI и скриптов развертывания
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'body-leading-blank': [2, 'always'],
  },
};
