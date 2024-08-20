import apiSdkRegistry from './api_sdk_registry';

const fetchAPISDK = (apiName: string) => {
  return apiSdkRegistry[apiName];
};

export default fetchAPISDK;
