import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import { callGetAPI, callPostAPI } from '../../../utils/utils';

export const AddProductToWishlistFetch = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'add_to_wishlist';
  const entity = 'wishlist';
  const item_code = request.prod_id;
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}`;

  response = await callPostAPI(url, undefined, request?.token);
  return response;
};

export const GetWishlistDataFetch = async (request: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = 'get_wishlist_items';
  const entity = 'wishlist';
  const url = `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}&method=${method}&entity=${entity}`;

  response = callGetAPI(url, request.token);
  return response;
};

export const DeleteProductFromWishlistFetch = async (request: any) => {
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
      console.log('api res', res);
      response = res?.data?.message;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
