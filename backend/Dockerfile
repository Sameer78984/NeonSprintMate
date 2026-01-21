# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency definitions
COPY backend/package*.json ./backend/

# Install only production dependencies
RUN cd backend && npm ci --omit=dev

# Stage 2: Final Production Image
FROM node:22-alpine
WORKDIR /app/backend

COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package*.json ./

COPY backend/ .

EXPOSE 5000
USER node

CMD ["npm", "start"]