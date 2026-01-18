FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev --ignore-scripts

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate || true

# Copy pre-compiled dist folder
COPY dist ./dist

# Copy everything else
COPY . .

# Rebuild native modules
RUN npm rebuild || true

EXPOSE 5000

CMD ["npm", "run", "start"]
