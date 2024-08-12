import { fetchDataFromAPI } from '../../../utils/http-methods';

const getBannerAPI = async (appName: string, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use fetchDataFromAPI to handle GET Request logic
  const response = await fetchDataFromAPI(
    appName,
    'banner-api',
    'get',
    'banner',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getBannerAPI;
