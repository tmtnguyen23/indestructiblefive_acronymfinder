# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the frontend application code
COPY ./client/ .

# Install frontend dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Expose port 3000 for React app
EXPOSE 3000

# Serve the React app
CMD ["npm", "start"]