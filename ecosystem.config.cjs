require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  apps: [{
    name: 'devlog',
    script: 'dist/server/entry.mjs',
    instances: 1,
    autorestart: true,
    watch: false,
    env_production: {
      NODE_ENV: 'production',
      PORT: 4321,
      HOST: '127.0.0.1',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      SESSION_SECRET: process.env.SESSION_SECRET,
      GISCUS_REPO: process.env.GISCUS_REPO,
      GISCUS_REPO_ID: process.env.GISCUS_REPO_ID,
      GISCUS_CATEGORY_ID: process.env.GISCUS_CATEGORY_ID,
    },
  }],
};
