import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const DeleteItemFromCart = async (request: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const method = 'delete_products';
  const entity = 'cart';
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const item_code = request?.item_code;
  const quotation_id = request?.quotation_id;
  const params = `?version=${version}&method=${method}&entity=${entity}&item_code=${item_code}&quotation_id=${quotation_id}`;
  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, config)
    .then((res) => {
      response = res;
    })
    .catch((err) => {

    });
  return response;
};
