import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const fetchProductListingPageDropDownFilters = async (appConfig: APP_CONFIG, requestParams: any, token: any) => {
  const additionalParams = {
    vehicle_company: requestParams?.vehicle_company || [], 
    vehicle_name: requestParams?.vehicle_name || [] 
  };
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-product-listing-dropdown-filters-api',
    token,
    additionalParams 
  );

  return response;
};

export default fetchProductListingPageDropDownFilters;
