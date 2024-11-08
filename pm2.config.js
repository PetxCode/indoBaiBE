module.exports = {
  apps: [
    {
      name: "my-app",
      script: "app.ts", // Entry point for your TypeScript app
      interpreter: "ts-node", // Use ts-node to run TypeScript files
      watch: true, // Optional: enable file watching
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
