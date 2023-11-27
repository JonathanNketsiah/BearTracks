# Use an official Node.js image as the base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a smaller, production-ready image
FROM nginx:alpine

# Copy the built app to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]
