FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm rebuild || true

EXPOSE 5000

# Use production start command
CMD ["npm", "run", "start"]
