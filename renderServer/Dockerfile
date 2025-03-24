# Use Playwright image with Puppeteer dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install system dependencies
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

# Set environment variable to skip Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install dependencies (without dev dependencies)
RUN npm install --omit=dev

# Copy all files
COPY . .

# Expose the correct port for Render (PORT from .env)
EXPOSE ${PORT}

# Start the app using environment variables
CMD ["sh", "-c", "node index.js"]
