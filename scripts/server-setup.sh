#!/bin/bash
# 서버 최초 1회 실행
set -e

echo "=== DevLog 서버 초기 세팅 ==="

# Node.js 설치 확인
if ! command -v node &> /dev/null; then
  echo "Node.js 설치 중..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node: $(node --version)"

# PM2 설치
if ! command -v pm2 &> /dev/null; then
  echo "PM2 설치 중..."
  sudo npm install -g pm2
  pm2 startup systemd -u bubble --hp /home/bubble | tail -1 | sudo bash
fi
echo "PM2: $(pm2 --version)"

# 레포 클론 (없으면)
if [ ! -d ~/devlog ]; then
  echo "레포 클론 중..."
  git clone https://github.com/JeongBeobWoo/devlog.git ~/devlog
fi

cd ~/devlog

# .env 파일 생성 (없으면)
if [ ! -f .env ]; then
  echo ".env 파일을 생성합니다. 값을 직접 입력하세요:"
  cat > .env << 'ENVEOF'
ADMIN_PASSWORD=bubblestone2024!
SESSION_SECRET=change-this-to-a-random-secret-string-32chars
GISCUS_REPO=JeongBeobWoo/devlog
GISCUS_REPO_ID=R_kgDOU1-Zlw
GISCUS_CATEGORY_ID=DIC_kwDOU1-Zl84DGxRr
ENVEOF
  echo ".env 생성 완료 (ADMIN_PASSWORD와 SESSION_SECRET을 변경하세요)"
fi

# 빌드
npm install
npm run build

# PM2 시작
pm2 start ecosystem.config.cjs --env production
pm2 save

# Nginx 설정
echo "Nginx 설정 복사 중..."
sudo cp nginx.conf /etc/nginx/sites-available/devlog
sudo ln -sf /etc/nginx/sites-available/devlog /etc/nginx/sites-enabled/devlog
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "=== 완료 ==="
echo "http://devlog.bubblestone.net 접속 확인하세요"
echo "ADMIN_PASSWORD 변경: nano ~/devlog/.env"
