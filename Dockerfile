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

# Copy proto files to dist (where the app expects them)
COPY src/grpc/proto ./dist/grpc/proto

# Copy everything else
COPY . .

# Rebuild native modules
RUN npm rebuild || true

EXPOSE 55000

CMD ["npm", "run", "start"]
