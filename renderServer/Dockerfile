# Use a base image with Puppeteer dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (skip unnecessary Chromium download)
RUN apt-get update && apt-get install -y \
    wget curl unzip fontconfig locales \
    gconf-service libasound2 libatk1.0-0 \
    libcups2 libdrm2 libxkbcommon-x11-0 \
    libgtk-3-0 libgbm-dev libnss3 \
    libxss1 libxtst6 ca-certificates \
    fonts-liberation libappindicator1 \
    libappindicator3-1 libcurl4 libdbus-1-3 \
    libnspr4 lsb-release xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies without Puppeteer's bundled Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install --omit=dev

# Copy all files and set up the app
COPY . .

CMD ["node", "index.js"]
