FROM node:20 AS build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
RUN npm i sharp
# Copy the rest of the application code
COPY . .

# Navigate to themes directory, clone the theme, and install it
WORKDIR /app/themes
RUN git clone <github_repo_name>
WORKDIR /app/themes/<theme_name>
RUN /bin/bash install-theme.sh

# Return to the root directory
WORKDIR /app

# Build the Next.js app
RUN npm run build
# Exposethe port Next.js will run on
EXPOSE 3000
# Start the Next.js application
CMD ["npm", "start"]