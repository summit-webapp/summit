# This script fetches summit settings based on the value of the environment variable NEXT_PUBLIC_ENGINE_NAME.
# 
# Usage:
# - Ensure the .env file is present in the same directory as this script and contains the required environment variables:
#   - NEXT_PUBLIC_ENGINE_NAME: Specifies the engine name (e.g., "EMR" or "Summit").
#   - NEXT_PUBLIC_API_URL: Base URL for the API endpoint.
#
# Functionality:
# 1. Sources the .env file to load environment variables.
# 2. Checks the value of NEXT_PUBLIC_ENGINE_NAME:
#    - If "EMR", creates an empty JSON object in summit-settings.json and exits.
#    - If "Summit", fetches summit settings from the API endpoint and saves the response to summit-settings.json.
# 3. Validates the API response:
#    - Checks the HTTP status code to ensure the request was successful (200).
#    - Checks the JSON response for any "exception" field indicating an error.
# 4. Outputs appropriate success or error messages based on the results.
#
# Notes:
# - The API endpoint is constructed using NEXT_PUBLIC_API_URL and the resource path for Summit Settings.
# - The output file for the fetched settings is summit-settings.json in the current directory.
# - Error handling is implemented for:
#   - Invalid HTTP status codes.
#   - Errors indicated in the JSON response.
#
# Future Considerations:
# - Additional engine names can be supported by uncommenting and modifying the elif block for unsupported values.
#!/bin/bash

# Load environment variables
if [ ! -f ".env" ]; then
  echo "Error: .env file not found in $(pwd)"
  exit 1
fi

source "$(dirname "$0")/.env"

# Check if required environment variables are set
if [ -z "$NEXT_PUBLIC_ENGINE_NAME" ]; then
  echo "Error: NEXT_PUBLIC_ENGINE_NAME is not set in the .env file"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo "Error: NEXT_PUBLIC_API_URL is not set in the .env file"
  exit 1
fi

# Check NEXT_PUBLIC_ENGINE_NAME value
if [ "$NEXT_PUBLIC_ENGINE_NAME" == "EMR" ]; then
  echo "{}" > ./summit-settings.json
  echo "NEXT_PUBLIC_ENGINE_NAME is EMR. Empty object stored in summit-settings.json"
  exit 0
elif [ "$NEXT_PUBLIC_ENGINE_NAME" == "Summit" ]; then
  echo "NEXT_PUBLIC_ENGINE_NAME is Summit. Proceeding to fetch summit settings."
  
  API_URL="${NEXT_PUBLIC_API_URL}/api/resource/Summit%20Settings/Summit%20Settings"
  OUTPUT_FILE="./summit-settings.json"

  HTTP_STATUS=$(curl -s -o $OUTPUT_FILE -w "%{http_code}" $API_URL)

  if [ "$HTTP_STATUS" -ne 200 ]; then
    echo "Error Code: API request failed with status code $HTTP_STATUS"
    echo "Error Message: $(cat $OUTPUT_FILE)"
    exit 1
  fi

  if grep -q '"exception"' $OUTPUT_FILE; then
    echo "Error: Summit settings fetch failed. Details:"
    cat $OUTPUT_FILE
    exit 1
  fi

  echo "Summit settings data fetched and saved to $OUTPUT_FILE"

fi
