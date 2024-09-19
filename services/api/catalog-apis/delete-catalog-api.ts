import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeDELETEAPI } from '../../../utils/http-methods';

export const DeleteCatalogAPI = async (appConfig: APP_CONFIG, request: any, token: any) => {
  const additionalParams = request; // Add additional parameters if needed
  const response = executeDELETEAPI(appConfig, 'delete-catalog-api', additionalParams, token);
  return response;
};
