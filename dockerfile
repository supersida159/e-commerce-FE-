# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Use an official image as the base image for the final image
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build output from the base image
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules

# Start the application using `serve`
CMD ["serve", "-s", ".next"]

# Expose the port the app runs on
EXPOSE 3000
