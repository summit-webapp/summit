import { callGetAPI } from '../../../utils/utils';
import { CONSTANTS } from '../../config/app-config';

const getBannerAPI = async (token: any) => {
  const version = CONSTANTS.VERSION;
  const method = 'get';
  const entity = 'banner';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, token);
  return response;
};

export default getBannerAPI;
