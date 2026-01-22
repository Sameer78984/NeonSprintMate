# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder
WORKDIR /app

# FIX 1: Explicitly point to the backend folder
COPY backend/package.json ./
# We copy package-lock if it exists, but don't fail if it doesn't
COPY backend/package-lock.json* ./

# FIX 2: Use 'npm install' instead of 'npm ci' to prevent lockfile crashes
RUN npm install --omit=dev

# FIX 3: Copy the source code from the backend folder
COPY backend/ .

# Stage 2: Final Production Image
FROM node:22-alpine
WORKDIR /app/backend

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# Copy the rest of the backend code
COPY backend/ .

EXPOSE 5000
USER node

CMD ["npm", "start"]