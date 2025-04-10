# Use Bun as the base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json  ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Generate Prisma client properly
RUN npx prisma generate

RUN npm run build


CMD ["npm","run","start:dev"]