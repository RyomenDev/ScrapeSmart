# Base Node.js image
FROM node:18-alpine AS base

# Install Chromium and required dependencies
RUN apk update && apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont


# ---- SERVER ----
    
FROM base AS server
WORKDIR /app/server

# Copy package files and install dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy the rest of the server files
COPY server .

# # Set environment variables from Docker Compose
# ARG MONGO_URI
# ARG PORT
# ARG GEMINI_API_KEY
# ARG OPENAI_API_KEY
# ARG SERVER_URL
# ARG FRONTEND_URL

# ENV MONGO_URI=$MONGO_URI
# ENV PORT=$PORT
# ENV GEMINI_API_KEY=$GEMINI_API_KEY
# ENV OPENAI_API_KEY=$OPENAI_API_KEY
# ENV SERVER_URL=$SERVER_URL
# ENV FRONTEND_URL=$FRONTEND_URL

# Copy server environment variables
COPY server/.env .env
ENV $(cat .env | xargs)

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Start the server
CMD ["node", "index.js"]

# ---- CLIENT ----
FROM base AS client
WORKDIR /app/client

# Copy package files and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the client files
COPY client .

# # Set environment variables for Vite
# ARG VITE_SERVER_URL
# ARG VITE_FRONTEND_URL

# ENV VITE_SERVER_URL=$VITE_SERVER_URL
# ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL

# Copy client environment variables
COPY client/.env .env
ENV $(cat .env | xargs)

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
