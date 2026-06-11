#!/bin/sh

# 토큰이 없을 경우 에러 메시지 출력 후 종료
#if [ -z "$TUNNEL_TOKEN" ]; then
#  echo "ERROR: TUNNEL_TOKEN environment variable is required."
#  exit 1
#fi

echo "1. Starting Cloudflare Tunnel..."
# cloudflared를 백그라운드(&)로 실행하며, 들어오는 트래픽을 localhost의 지정된 포트로 포워딩
#cloudflared tunnel --no-autoupdate run --token "eyJhIjoiYWUzZmNjZDYzMjJlNDY4NGYzYzc5MDhkZWY3NTdhMTUiLCJ0IjoiMmRjZjJmOWUtMzY0ZC00NzhjLWEzNjEtYTc4MTVkZGIyYTFkIiwicyI6Ill6QTFOMkZoWmpVdE9HUXpaUzAwT1dZeUxXRTVZVEl0TnpNNE5Ua3dPV1JrTlROaSJ9" &
cloudflared tunnel --url http://localhost:3000
echo "2. Starting Node.js Application on port $PORT..."
# Node.js 앱을 포그라운드로 실행하여 컨테이너가 유지되도록 함
if [ $# -gt 0 ]; then
  exec "$@"
else
  exec npm start
fi
