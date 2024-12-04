module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm turbo dev --filter=sso",
      url: ["http://localhost:3001"],
      numberOfRuns: 3,
      startServerReadyPattern: "ready started server on",
      settings: {
        preset: "desktop"
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
        "categories:seo": ["error", { minScore: 0.9 }]
      }
    },
    server: {
      port: 9001
    }
  }
};
