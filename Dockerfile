FROM node:20-alpine

# 1. cloudflared 설치에 필요한 필수 패키지 설치
RUN apk add --no-cache curl libc6-compat

# 2. 시스템 아키텍처에 맞는 cloudflared 바이너리 다운로드 및 설치
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then CLOUD_ARCH="amd64"; \
    elif [ "$ARCH" = "aarch64" ]; then CLOUD_ARCH="arm64"; \
    else CLOUD_ARCH="amd64"; fi && \
    curl -L -o /usr/local/bin/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-${CLOUD_ARCH} && \
    chmod +x /usr/local/bin/cloudflared

# 3. 앱 디렉토리 설정 및 소스 복사
WORKDIR /app
#COPY package*.json ./
#RUN npm install
COPY . .

# 4. 컨테이너 시작 시 실행할 스크립트 복사 및 권한 부여
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 환경 변수 기본값 설정 (실행 시 주입 가능)
ENV PORT=3000

ENTRYPOINT ["/entrypoint.sh"]
