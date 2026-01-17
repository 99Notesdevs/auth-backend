FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev for TypeScript build)
RUN npm ci --ignore-scripts

# Copy prisma schema
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Rebuild native modules
RUN npm rebuild || true

EXPOSE 5000

CMD ["npm", "run", "start"]
