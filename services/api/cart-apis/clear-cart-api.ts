import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const DeleteClearCart = async (appConfig: APP_CONFIG, quotation_id: any, token: any) => {
  let response: any;

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const method = 'clear_cart';
  const entity = 'cart';
  const version = appConfig.version;
  const params = `?version=${version}&method=${method}&entity=${entity}&quotation_id=${quotation_id}`;
  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${appConfig.app_name}${params}`, config)
    .then((res) => {
      response = res;
    })
    .catch((err) => {});
  return response;
};
