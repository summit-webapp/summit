#!/bin/bash

# Source the .env file to load the environment variables
source .env

# Define the API endpoint
API_URL="${NEXT_PUBLIC_API_URL}/api/resource/Summit%20Settings/Summit%20Settings"

# Define the output file path
OUTPUT_FILE="./summit-settings.json"

# Fetch the data and save it to the output file
curl -s $API_URL -o $OUTPUT_FILE

# Print a success message
if [ $? -eq 0 ]; then
  echo "Summit settings data fetched and saved to $OUTPUT_FILE"
else
  echo "Failed to fetch Summit settings data"
  exit 1
fi
