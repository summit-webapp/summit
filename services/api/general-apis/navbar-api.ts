import { fetchDataFromAPI } from '../../../utils/http-methods';

const getNavbarDataFromAPI = async (appName: string, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use fetchDataFromAPI to handle GET Request logic
  const response = await fetchDataFromAPI(
    appName,
    'navbar-api',
    'get_mega_menu',
    'mega_menu',
    token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export default getNavbarDataFromAPI;
