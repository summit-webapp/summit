#!/bin/bash

# Source the .env file to load environment variables
source .env

# Define the API endpoint
API_URL="${NEXT_PUBLIC_API_URL}/api/resource/Summit%20Settings/Summit%20Settings"

# Define the output file path
OUTPUT_FILE="./summit-settings.json"

# Fetch the data and capture the HTTP status code
HTTP_STATUS=$(curl -s -o $OUTPUT_FILE -w "%{http_code}" $API_URL)

# Check the HTTP status code
if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "Error: API request failed with status code $HTTP_STATUS"
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
