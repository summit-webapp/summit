import { callGetAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getBannerAPI = async (token: any) => {
  const version = CONSTANTS.SUMMIT_API_SDK_VERSION;
  const method = 'get';
  const entity = 'banner';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const response: any = await callGetAPI(`${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_API_SDK}${params}`, token);
  return response;
};

export default getBannerAPI;
