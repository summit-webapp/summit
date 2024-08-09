import { callGetAPI, fetchDataFromAPI } from '../../../utils/http-methods';
import fetchAPISDK from '../../../utils/get-api-sdk';
import fetchFrappeAppVersion from '../../../utils/get-frappe-app-version';
import { CONSTANTS } from '../../config/app-config';

// const getNavbarDataFromAPI = async (appName: string, token: any) => {
//   let response: any;
//   let frappeAppName: string = appName;

//   const getAPISDKName = fetchAPISDK('navbar-api');
//   if (getAPISDKName !== '') {
//     frappeAppName = getAPISDKName;
//   }
//   const getFrappeAppVersion = fetchFrappeAppVersion(frappeAppName);
//   if (getFrappeAppVersion === '0.0.0') {
//     return 'Invalid App. Please check the app name.';
//   } else {
//     const version = getFrappeAppVersion;
//     const method = 'get_mega_menu';
//     const entity = 'mega_menu';
//     const params = `?version=${version}&method=${method}&entity=${entity}`;
//     response = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, token);
//     return response;
//   }
// };

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
