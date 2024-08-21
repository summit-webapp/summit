import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const DeleteItemFromCart = async (appConfig: APP_CONFIG, request: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const method = 'delete_products';
  const entity = 'cart';
  const version = appConfig.version;
  const item_code = request?.item_code;
  const quotation_id = request?.quotation_id;
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}&quotation_id=${quotation_id}`;
  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${appConfig.app_name}${params}`, config)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err;
    });
  return response;
};
