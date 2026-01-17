FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts

# Copy prisma schema (if service uses Prisma)
COPY prisma ./prisma/

# Generate Prisma Client (if service uses Prisma)
RUN npx prisma generate

# Copy application code
COPY . .

# Rebuild native modules
RUN npm rebuild || true

# Expose port (adjust per service)
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
