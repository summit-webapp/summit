import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';
const promotionalBannerAPI = async (appConfig: APP_CONFIG, reqParams: any, token: any) => {
  const additionalParams = { fields: JSON.stringify(reqParams) };
  const response = await executeGETAPI(undefined, '', token, additionalParams, `/api/resource/Promotional Banner`);
  return response;
};
export default promotionalBannerAPI;
