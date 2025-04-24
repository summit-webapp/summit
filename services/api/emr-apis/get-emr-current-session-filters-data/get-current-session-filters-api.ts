import APP_CONFIG from '../../../../interfaces/app-config-interface';
import { apiEndpointFetcher } from '../../../../utils/http-methods';

const fetchCurrentSessionFilters = async (appConfig: APP_CONFIG, requestParams: any, token: any, appName: any = undefined) => {
  const additionalParams = {};
  if (appName) {
    const response = await apiEndpointFetcher(appName, 'get-current-session-filters-api', `Bearer ${token}`, additionalParams, undefined);
    return response;
  }
};

export default fetchCurrentSessionFilters;
