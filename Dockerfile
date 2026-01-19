# Stage 1: Base image for installing dependencies
FROM node:20-alpine AS deps

# Install necessary packages for building native addons
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches/

# Install dependencies
RUN pnpm install --frozen-lockfile


# Stage 2: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm for the build command
RUN npm install -g pnpm

# Set environment for production build
ENV NODE_ENV=production

# Build the project
RUN pnpm run build


# Stage 3: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 appuser
RUN adduser --system --uid 1001 appuser

# Copy built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Change ownership of the app directory
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose the port the app runs on (Cloud Run default is 8080)
ENV PORT=8080
EXPOSE 8080

# Set the command to start the app
CMD ["node", "dist/index.js"]
