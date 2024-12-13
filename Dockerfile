# Use Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to cache dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Ensure Gatsby CLI is available in PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy the rest of the application files
COPY . .

# Expose Gatsby's default development port
EXPOSE 8000

# Default command to start Gatsby development server
# CMD ["gatsby", "develop", "-H", "0.0.0.0", "-p", "8000"]
CMD ["npm", "run", "start"]