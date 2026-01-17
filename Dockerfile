# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with flags to avoid QEMU crashes
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts

# Copy prisma schema first
COPY prisma ./prisma/

# Generate Prisma Client for AMD64
RUN npx prisma generate

# Copy the entire app
COPY . .

# Rebuild native modules if needed
RUN npm rebuild || true

# Expose server port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
