#!/bin/bash

# Source the .env file to load environment variables
source .env

# Define the API endpoint
API_URL="${NEXT_PUBLIC_API_URL}/api/resource/Summit%20Settings/Summit%20Settings"

# Define the output file path
OUTPUT_FILE="./summit-settings.json"

# Fetch the data and save it to the output file
curl -s $API_URL -o $OUTPUT_FILE

# Check if the fetch was successful
if [ $? -ne 0 ]; then
  echo "Failed to fetch Summit settings data"
  exit 1
fi

# Check for errors in the JSON response
if grep -q '"exception"' $OUTPUT_FILE; then
  echo "Error: Summit settings fetch failed. Details from summit-settings.json:"
  cat $OUTPUT_FILE
  exit 1
fi

# Success message
echo "Summit settings data fetched and saved to $OUTPUT_FILE"
