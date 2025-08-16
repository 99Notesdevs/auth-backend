# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app
COPY . .

# Generate Prisma Client Prior
RUN npx prisma generate

# Expose server port (Match it with your app)
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
