import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getNavbarDataFromAPI = async (token: any) => {
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get_mega_menu';
  const entity = 'mega_menu';
  let response: any;

  const params = `?version=${version}&method=${method}&entity=${entity}`;
  response = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, token);
  return response;
};

export default getNavbarDataFromAPI;
