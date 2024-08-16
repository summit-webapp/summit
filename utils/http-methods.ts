import axios from 'axios';
import fetchAPISDK from '../utils/get-api-sdk';
import fetchFrappeAppVersion from '../utils/get-frappe-app-version';
import { CONSTANTS } from '../services/config/app-config';
/**
 * Fetches data from an API by handling repetitive steps like fetching SDK names,
 * getting the Frappe app version, constructing the API URL, and making the call.
 *
 * @async
 * @function fetchDataFromAPI
 * @param {string} appName - The name of the Frappe App default its SUMMIT_API_SDK.
 * @param {string} apiName - The specific API name to fetch from the SDK.
 * @param {string} method - The method name to be used in the API call.
 * @param {string} entity - The entity name to be fetched.
 * @param {string} token - The authentication token.
 * @param {Object} additionalParams - Additional parameters to be appended to the API call.
 * @returns {Promise<any>} - The response from the API call.
 * @throws {Error} Throws an error if the API call fails.
 */
export const fetchDataFromAPI = async (
  appName: string,
  apiName: string,
  method: string,
  entity: string,
  token: any,
  additionalParams: Record<string, any> = {}
): Promise<any> => {
  // Fetch the API SDK name
  const sdkName = fetchAPISDK(apiName);
  const frappeAppName = sdkName !== '' ? sdkName : appName;

  // Fetch the Frappe App version
  const appVersion = fetchFrappeAppVersion(frappeAppName);
  if (appVersion === '0.0.0') {
    return 'Invalid App. Please check the app name.';
  }

  // Construct the API parameters
  const params = new URLSearchParams({
    version: appVersion,
    method,
    entity,
    ...additionalParams, // Add additional parameters if provided
  });
  const storeParams = params.toString();
  const baseURL = `${CONSTANTS.API_BASE_URL}${frappeAppName}?${storeParams}`;
  // Make the API call
  const response = await callGetAPI(`${baseURL}`, token);
  return response;
};

export const callGetAPI = async (url: string, token: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: token } : {}),
    },
  };
  await axios
    .get(`${url}`, {
      ...API_CONFIG,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out. API took too long to return response.';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = err?.response?.data?.exception ?? 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });

  return response;
};
export const callPostAPI = async (url: string, body: any, token: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      Authorization: token,
    },
  };
  await axios
    .post(url, body, {
      ...API_CONFIG,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        response = 'Request timed out. API took too long to return response.';
      } else if (err.code === 'ERR_BAD_REQUEST') {
        response = 'Bad Request';
      } else if (err.code === 'ERR_INVALID_URL') {
        response = 'Invalid URL';
      } else {
        response = err;
      }
    });
  return response;
};
