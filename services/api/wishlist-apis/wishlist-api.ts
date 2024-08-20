import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, callPostAPI, executeGETAPI } from '../../../utils/http-methods';

export const AddProductToWishlist = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'add_to_wishlist';
  const entity = 'wishlist';
  const item_code = request.prod_id;
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;

  response = await callPostAPI(url, undefined, request?.token);
  return response;
};

export const GetWishlistData = async (appName: any, request: any) => {
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(
    appName,
    'wishlist-api',
    'get_wishlist_items',
    'wishlist',
    request.token,
    additionalParams // Pass additional parameters if needed
  );

  return response;
};

export const DeleteProductFromWishlist = async (request: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const method = 'remove_from_wishlist';
  const entity = 'wishlist';
  const item_code = request.prod_id;
  const version = CONSTANTS.VERSION;
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;
  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, config)
    .then((res) => {
      response = res?.data?.message;
    })
    .catch((err) => {});
  return response;
};
