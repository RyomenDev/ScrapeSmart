#### Dockerfile to run both React (client) and Node.js (server) in a single container using Docker Compose, while ensuring environment variables are correctly loaded.

## Folder Structure

```BASH
project-root/
│── client/      # React.js Frontend
│── server/      # Node.js Backend
│── docker-compose.yml
│── Dockerfile
│── .env
```

### 1️⃣ Create .env File

Define your environment variables:

### :clubs: A. Client

```ini
VITE_SERVER_URL="http://localhost:5000"
```

### :clubs: B. Server

```sh
VITE_SERVER_URL=http://localhost:5000
MONGO_URI=mongodb://mongodb_container:27017/scrapesmart # if using Container image
# MONGO_URI=mongodb+srv://yourUsername:yourEncodedPassword@cluster0.mongodb.net/yourDatabase # if using cloud Db
# # MONGO_URI="mongodb://localhost:27017/" # If use locally setup DB
PORT=5000
SERVER_URL="http://localhost:5000"
OPENAI_API_KEY="sk-proj-"
GEMINI_API_KEY="AIz.."

```

2️⃣ Create a Dockerfile

```Dockerfile
# Base Node.js image
FROM node:18-alpine AS base

# ---- SERVER ----
FROM base AS server
WORKDIR /app/server

# Copy package files and install dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy server files
COPY server .

# Copy server environment variables
COPY server/.env .env
ENV $(cat .env | xargs)

# Start the server
CMD ["node", "index.js"]

# ---- CLIENT ----
FROM base AS client
WORKDIR /app/client

# Copy package files and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy client files
COPY client .

# Copy client environment variables
COPY client/.env .env
ENV $(cat .env | xargs)

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]

```

- With Authenticated cloud mongoDb Database
- MongoDB: Running on `mongodb://mongo:27017`

```yml
# docker-compose.yml
version: "3.8"

services:
  server:
    build:
      context: .
      dockerfile: Dockerfile
      target: server
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - mongo

  client:
    build:
      context: .
      dockerfile: Dockerfile
      target: client
    ports:
      - "3000:80"
    depends_on:
      - server

  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: yourUsername
      MONGO_INITDB_ROOT_PASSWORD: yourEncodedPassword
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

- Local MongoDb Database

```yml
# docker-compose.yml
version: "3.8"

services:
  server:
    build:
      context: .
      dockerfile: Dockerfile
      target: server
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - client

  client:
    build:
      context: .
      dockerfile: Dockerfile
      target: client
    ports:
      - "3000:80"
    depends_on:
      - server
```

- Container MongoDb Database

```yml
services:
  mongo:
    image: mongo:6.0
    container_name: mongodb_container
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: ScrapeSmart

  server:
    build:
      context: .
      dockerfile: Dockerfile
      target: server
    container_name: server_container
    restart: always
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    env_file:
      - server/.env # Load environment variables correctly

  client:
    build:
      context: .
      dockerfile: Dockerfile
      target: client
    container_name: client_container
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - server
    env_file:
      - client/.env # Load environment variables correctly
    command: ["npm", "run", "dev", "--", "--host"]

volumes:
  mongo_data:
```

### 3️⃣ How This Works

The server runs at http://localhost:5000
The **frontend (Vite + React)** runs at http://localhost:5173
The frontend automatically picks up **VITE_SERVER_URL and VITE_FRONTEND_URL**
MongoDB runs inside a container

### 4️⃣ Run Everything

```sh
docker-compose up --build
```

- ✅ MongoDB runs in a container
- ✅ Node.js server runs in a container
- ✅ React Vite client runs in a container

✅ Check if Docker is running:
Run:

```sh
docker info
```

If it fails, restart Docker Desktop and try:

```sh
docker-compose up --build
```

✅ Check if the Docker Engine is accessible:
If using Windows with WSL, run:

```sh
wsl --update
wsl --shutdown
```

Then restart Docker Desktop.

✅ Manually remove old containers and images:

```sh
docker-compose down
docker system prune -a
docker-compose up --build
```

### 5️⃣ Access the App

- **Frontend (Vite + React): `http://localhost:5173`**
- **Backend (Node.js API): `http://localhost:5000`**
