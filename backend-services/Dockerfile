# Use the official Node.js image
FROM node:18-alpine3.21

# Set working directory
WORKDIR /jovialize-backend-services

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . . 

# Expose the port the service will run on
EXPOSE 6001

# Command to run the service
CMD ["npm", "run", "start"]