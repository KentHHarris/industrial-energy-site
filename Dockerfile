# Stage 1: Building the code
FROM node:18-alpine3.20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Run the web service on container startup.
CMD ["npm", "start"]
