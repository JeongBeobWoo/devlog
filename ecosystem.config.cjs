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
    },
  }],
};
