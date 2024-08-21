import { executeGETAPI, executePOSTAPI } from '../../../utils/http-methods';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const AddProductToWishlist = async (appConfig: APP_CONFIG, request: any, token: any) => {
  let response: any = await executePOSTAPI(appConfig, 'add-item-to-wishlist-api', request, token);
  return response;
};

export const GetWishlistData = async (appConfig: APP_CONFIG, token: any) => {
  const additionalParams = {}; // Add additional parameters if needed

  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appConfig,
    'get-wishlist-items-api',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};

export const DeleteProductFromWishlist = async (appConfig: APP_CONFIG, request: any, token: any) => {
  const additionalParams = { ...request };
  const response = await executeGETAPI(
    appConfig,
    'remove-item-from-wishlist-api',
    token,
    additionalParams // Pass additional parameters if needed
  );
  return response;
};
