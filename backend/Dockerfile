# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder

# Set the working directory to the project root in the container
WORKDIR /app

# Copy dependency definitions first for optimal build caching
COPY backend/package*.json ./backend/

# Install only production dependencies inside the backend folder
RUN cd backend && npm ci --omit=dev

# Stage 2: Final Production Image
FROM node:22-alpine

WORKDIR /app/backend

# Copy the installed dependencies from the builder stage
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package*.json ./

# Copy the actual source code (your src/ folder)
COPY backend/src ./src

# Expose the port defined in your Express server (5000)
EXPOSE 5000

# Security Best Practice: Don't run as root user
USER node

# Start the application using your npm script
CMD ["npm", "start"]