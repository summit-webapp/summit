import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

export const DeleteClearCart = async (quotation_id: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const method = 'clear_cart';
  const entity = 'cart';
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const params = `?version=${version}&method=${method}&entity=${entity}&quotation_id=${quotation_id}`;
  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, config)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
