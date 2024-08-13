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
# Build the Next.js app
RUN npm run build
# Exposethe port Next.js will run on
EXPOSE 3000
# Start the Next.js application
CMD ["npm", "start"]