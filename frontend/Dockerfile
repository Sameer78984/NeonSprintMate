# ------------------------------------------------------------------
# Stage 1: Build the React Application
# ------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# 1. Install Dependencies
# Copying package files first leverages Docker cache
COPY package*.json ./
RUN npm ci

# 2. Build the App
COPY . .
RUN npm run build

# ------------------------------------------------------------------
# Stage 2: Serve with Nginx (Production)
# ------------------------------------------------------------------
FROM nginx:alpine

# 1. Copy the build output from Stage 1 to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# 2. Copy our custom Nginx config (for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]