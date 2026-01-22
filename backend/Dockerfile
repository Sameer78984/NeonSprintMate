# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Stage 2: Final Production Image
FROM node:22-alpine
WORKDIR /app/backend

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY . .

EXPOSE 5000
USER node

CMD ["npm", "start"]