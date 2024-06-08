# Production Dockerfile
FROM node:22 AS builder

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Set the PNPM_HOME environment variable and update PATH
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Create the PNPM_HOME directory
RUN mkdir -p $PNPM_HOME/bin

# Set the SHELL environment variable
ENV SHELL=/bin/sh

# Copy pnpm lock file and package.json
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Create the production image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Set the PNPM_HOME environment variable and update PATH
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Copy the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/main"]
