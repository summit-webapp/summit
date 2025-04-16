import APP_CONFIG from '../../../interfaces/app-config-interface';
import { apiEndpointFetcher, executeGETAPI } from '../../../utils/http-methods';

const getComponentsList = async (page_type: string, appConfig: APP_CONFIG, appName: string) => {
  const additionalParams = { page_type }; // Add additional parameters if needed

  if (appName) {
    const response = await apiEndpointFetcher(appName, 'get-page-components-list-api', undefined, additionalParams, undefined);
    return response;
  }
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-page-components-list-api',
    undefined,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getComponentsList;
