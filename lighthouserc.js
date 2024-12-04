module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm turbo dev --filter=sso",
      url: ["http://localhost:3001"],
      numberOfRuns: 3,
      startServerReadyPattern: "ready started server on",
      settings: {
        preset: "desktop",
        // Включаем source maps
        skipAudits: ['uses-http2'],
      }
    },
    upload: {
      target: "temporary-public-storage"
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        
        // Отключаем некоторые слишком строгие проверки для разработки
        "unminified-javascript": "off",
        "unused-javascript": "off",
        "modern-image-formats": "off",
        
        // Устанавливаем более реалистичные пороги
        "server-response-time": ["warn", { maxNumericValue: 600 }],
        "total-byte-weight": ["warn", { maxNumericValue: 1000000 }],
        
        // PWA настройки
        "maskable-icon": "off", // Временно отключаем
        "service-worker": "off", // Временно отключаем
        
        // Производительность
        "render-blocking-resources": ["warn", { maxLength: 2 }],
        "uses-rel-preconnect": "off",
        "uses-responsive-images": "off"
      }
    },
    server: {
      port: 9001
    }
  }
};
