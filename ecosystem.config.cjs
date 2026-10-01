const path = require('path');

// .env 파일을 직접 읽어서 process.env에 주입
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  try {
    const fs = require('fs');
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    const env = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
    }
    return env;
  } catch {
    return {};
  }
}

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
      ...loadEnv(),
    },
  }],
};
