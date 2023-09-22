# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Clone the summit repository
RUN git clone https://github.com/summit-webapp/summit

# Change directory to the 'theme' folder
WORKDIR /app/summit/themes

# Clone the maxima repository
RUN git clone https://github.com/summit-webapp-themes/maxima

# Change directory to the 'maxima' folder
WORKDIR /app/summit/themes/maxima

# Run the theme installation script
RUN /bin/bash install-theme.sh

# Change directory back to the root of your project
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Delete the 'themes' folder
RUN rm -r /app/summit/themes

# Copy the rest of your application's files to the container
COPY . .

# Build the React application (assuming you have a build script in your package.json)
RUN npm run build

# Expose the port your React application will run on (if needed)
EXPOSE 3000

# Start your application in development mode
CMD ["npm", "run", "dev"]