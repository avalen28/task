# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /task-container-app

# Copy the package files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Set the entry point command
CMD ["npm", "start"]