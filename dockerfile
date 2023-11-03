# Use the official Node.js image as the base image
FROM node:18.17.1

# Create a working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Copy the main application file from the 'src' directory to the container
COPY ./src/ /app/

# Expose the port your application listens on (replace 3000 with your app's port)
EXPOSE 3000

# Start your Node.js application
CMD ["node", "app.js"]

