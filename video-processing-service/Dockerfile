# Use an official Node runtime as a parent/based image
# Stage 1: Build stage
FROM node:18 AS builder

# A Docker image can be used to instantiate one or more container
# A Dockerfile is a blueprint for a Docker image
# A Docker image is a blueprint for a container
# Container is going to run the code within its own file system

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the docker image
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
# Source code is not going to be reflected here
COPY --from=builder /app/dist ./dist

# Make port 3000 available outside this container
EXPOSE 3000

# Define the command to run your app using CMD (only one CMD allowed)
CMD [ "npm", "run", "serve" ]
