module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm turbo dev --filter=sso",
      url: ["http://localhost:3001"],
      numberOfRuns: 3,
      startServerReadyPattern: "ready started server on",
      settings: {
        preset: "desktop",
        // Включаем source maps и оптимизации
        skipAudits: ["uses-http2"],
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],

        // Отключаем некоторые проверки для разработки
        "bf-cache": "off", // Временно отключаем
        "csp-xss": "off", // Настроим позже в production
        "unminified-javascript": "off",
        "unused-javascript": "off",
        "modern-image-formats": "off",

        // Устанавливаем более реалистичные пороги
        "server-response-time": ["warn", { maxNumericValue: 600 }],
        "total-byte-weight": ["warn", { maxNumericValue: 1000000 }],

        // PWA настройки
        "maskable-icon": "off",
        "service-worker": "off",
        "installable-manifest": "off",
        "splash-screen": "off",
        "themed-omnibox": "off",

        // Производительность
        "render-blocking-resources": ["warn", { maxLength: 2 }],
        "uses-rel-preconnect": "off",
        "uses-responsive-images": "off",

        // JavaScript
        "bootup-time": ["warn", { maxNumericValue: 3000 }],
        "mainthread-work-breakdown": ["warn", { maxNumericValue: 4000 }],
        "dom-size": ["warn", { maxNumericValue: 1500 }],
        "legacy-javascript": ["warn", { maxLength: 2 }],

        // Source Maps
        "valid-source-maps": "off", // Временно отключаем для dev environment
      },
    },
    server: {
      port: 9001,
      // Добавляем таймаут для более стабильной работы
      timeout: 60000,
    },
  },
};
