# ======================
# Stage 1: Build frontend
# ======================
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install git (kalau kamu butuh ambil dependency dari repo)
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json dan package-lock.json dulu (agar cache efisien)
COPY workdir/package*.json ./

# Install dependencies
RUN npm install

# Copy semua file proyek
COPY workdir/ ./

# Build project
RUN npm run build


# ======================
# Stage 2: Serve with NGINX
# ======================
FROM nginx:alpine

# Copy hasil build dari stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config (kalau ada)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
