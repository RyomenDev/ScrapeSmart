# Use official Node.js Alpine (smallest size)
FROM node:18-alpine

# Install necessary dependencies for Chromium
RUN apk update && apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  libnss3 \
  libxcomposite \
  libxrandr \
  libxdamage \
  libjpeg-turbo \
  libwebp \
  udev \
  bash \
  dbus

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application files
COPY . .

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Expose the port (change if your server runs on a different port)
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
