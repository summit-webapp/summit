import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getNavbarDataFromAPI = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const method = 'get_mega_menu';
  const entity = 'mega_menu';
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;
  response = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, token);
  return response;
};

export default getNavbarDataFromAPI;
