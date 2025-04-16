import apiSdkRegistry from './api_sdk_registry';
import emrAPISDKRegistry from './api-sdk-registry/emr_api_sdk_registry';

// here putting appName at the end because currently if i do this then i have to make changes in all the files where i am using this function
// and also in the apiSdkRegistry file. So for now i am keeping it at the end. Later i will change it to the start of the function.
const fetchAPISDK = (apiName: string, appName: any = undefined) => {
  if (appName === 'EMR') {
    return emrAPISDKRegistry[apiName];
  } else {
    return apiSdkRegistry[apiName];
  }
};

export default fetchAPISDK;
