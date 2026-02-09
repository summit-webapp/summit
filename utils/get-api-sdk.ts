import apiSdkRegistry from './api_sdk_registry';
import emrSdkRegistry, { EMRApiKey } from './api-sdk-registry/emr_api_sdk_registry';

const fetchAPISDK = (apiName: string) => {
  const engineName = process.env.NEXT_PUBLIC_ENGINE_NAME;
  if (engineName === 'EMR') return emrSdkRegistry[apiName as EMRApiKey];
  else if (engineName === 'Summit') return apiSdkRegistry[apiName];
};

export default fetchAPISDK;
