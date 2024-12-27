import axios from 'axios';
import fetchAPISDK from '../utils/get-api-sdk';
import { CONSTANTS } from '../services/config/app-config';
import APP_CONFIG from '../interfaces/app-config-interface';

/**
 * @function getVME - VME stands for Version, Method and Entity for that API function.
 */
const getVME = (frappeAppConfig: APP_CONFIG, apiName: string) => {
  const sdkInfo = fetchAPISDK(apiName);
  const { version, method, entity } = sdkInfo;
  const sdkVersion = version ? version : frappeAppConfig.version;
  return {
    sdkVersion,
    method,
    entity,
  };
};
/**
 * Fetches data from an API by handling repetitive steps like fetching SDK names,
 * getting the Frappe app version, constructing the API URL, and making the call.
 *
 * @async
 * @function executeGETAPI
 * @param {string} appName - The name of the Frappe App default its SUMMIT_API_SDK.
 * @param {string} apiName - The specific API name to fetch from the SDK.
 * @param {string} token - The authentication token.
 * @param {Object} additionalParams - Additional parameters to be appended to the API call.
 * @returns {Promise<any>} - The response from the API call.
 * @throws {Error} Throws an error if the API call fails.
 */
export const executeGETAPI = async (
  frappeAppConfig: APP_CONFIG | undefined,
  apiName: string,
  token: any | undefined,
  additionalParams: Record<string, any> = {},
  path?: any
): Promise<any> => {
  let baseURL: string;
  let storeParams: any;
  if (frappeAppConfig) {
    const { sdkVersion, method, entity } = getVME(frappeAppConfig, apiName);
    const params = new URLSearchParams({
      version: sdkVersion,
      method,
      entity,
      ...additionalParams, // Add additional parameters if provided
    });
    storeParams = params.toString();
    baseURL = `${CONSTANTS.API_BASE_URL}${frappeAppConfig.app_name}?${storeParams}`;
  } else if (path) {
    const params = new URLSearchParams({
      ...additionalParams, // Add additional parameters if provided
    });
    storeParams = params.toString();

    // Construct the API parameters
    if (Object.keys(additionalParams).length !== 0) {
      baseURL = `${CONSTANTS.API_BASE_URL}${path}?${storeParams}`;
    } else {
      baseURL = `${CONSTANTS.API_BASE_URL}${path}`;
    }
  } else {
    throw new Error('Either frappeAppConfig or path must be provided.');
  }
  // Make the API call
  const response = await callGetAPI(`${baseURL}`, token);
  return response;
};

export const executePOSTAPI = async (frappeAppConfig: APP_CONFIG, apiName: string, apiBody: any, token?: any) => {
  /* GET all the required information about frappe app i.e it's version, method and entity.*/
  const { sdkVersion, method, entity } = getVME(frappeAppConfig, apiName);

  const body = {
    version: sdkVersion,
    method,
    entity,
    ...apiBody,
  };
  const url: string = `${CONSTANTS.API_BASE_URL}${frappeAppConfig.app_name}`;
  const response = await callPostAPI(url, body, token);
  return response;
};
export const executeDELETEAPI = async (frappeAppConfig: APP_CONFIG, apiName: string, apiBody: Record<string, any> = {}, token?: any) => {
  /* GET all the required information about frappe app i.e it's version, method and entity.*/
  const { sdkVersion, method, entity } = getVME(frappeAppConfig, apiName);
  const body = {
    version: sdkVersion,
    method,
    entity,
    ...apiBody,
  };
  const url: string = `${CONSTANTS.API_BASE_URL}${frappeAppConfig.app_name}`;
  const response = await callDeleteAPI(url, body, token);
  return response;
};

export const callGetAPI = async (url: string, token?: any) => {
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
      // timeout: 5000,
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
export const callPostAPI = async (url: string, body: any, token?: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      ...(token ? { Authorization: token } : {}),
    },
  };
  await axios
    .post(url, body, {
      ...API_CONFIG,
      // timeout: 5000,
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
const callDeleteAPI = async (url: string, body?: any, token?: any) => {
  let response: any;
  const API_CONFIG = {
    headers: {
      ...(token ? { Authorization: token } : {}),
    },
  };
  await axios
    .delete(`${url}`, { headers: { ...API_CONFIG.headers }, data: { ...body } })
    .then((res) => {
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
