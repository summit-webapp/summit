import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getComponentsList = async (page_type: string, appConfig: APP_CONFIG) => {
  const additionalParams = { page_type }; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'home-page-components-list-api',
    undefined,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getComponentsList;
