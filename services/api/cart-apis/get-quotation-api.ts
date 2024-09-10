import APP_CONFIG from '../../../interfaces/app-config-interface';
import { callPostAPI } from '../../../utils/http-methods';
import { CONSTANTS } from '../../config/app-config';

const getQuotationPostApi: any = async (appConfig: APP_CONFIG, quotation_id: any, token?: any) => {
  let response: any;
  let version = appConfig.version;
  const method = 'request_for_quotation';
  const entity = 'cart';
  const apiSDKName = appConfig.app_name;
  const url = `${CONSTANTS.API_BASE_URL}${apiSDKName}?version=${version}&method=${method}&entity=${entity}&quotation_id=${quotation_id}`;
  response = await callPostAPI(url, undefined, token);
  return response;
};
export default getQuotationPostApi;
