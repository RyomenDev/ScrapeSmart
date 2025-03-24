# Use an official Node.js image with Debian (required for Puppeteer)
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install required dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    fontconfig \
    locales \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon-x11-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnss3 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libappindicator3-1 \
    libcurl4 \
    libdbus-1-3 \
    libnspr4 \
    lsb-release \
    xdg-utils \
    --no-install-recommends

# Copy app files
COPY . .

# Expose port (if using an API)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
