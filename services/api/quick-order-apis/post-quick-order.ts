import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';

const postQuickOrderAPI: any = async (apiBody: any, token?: any) => {
    let response: any;
    let version = CONSTANTS.CUSTOM_API_SDK_VERSION;
    const method = 'create_sales_quotation';
    const entity = 'customer_item_reference_code_api';
    const apiSDKName = CONSTANTS.CUSTOM_API_SDK;
  
    const config = {
      headers: {
        Authorization: token,
      },
    };
  
    let body = {
      version: version,
      method: method,
      entity: entity,
      ...apiBody,
    };
  
    await axios
      .post(`${CONSTANTS.API_BASE_URL}${apiSDKName}`, body, {
        ...config,
        timeout: 5000,
      })
      .then((res: any) => {
        response = res;
      })
      .catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          response = 'Request timed out';
        } else if (err.code === 'ERR_BAD_REQUEST') {
          response = 'Bad Request';
        } else if (err.code === 'ERR_INVALID_URL') {
          response = 'Invalid URL';
        } else {
          response = err;
        }
      });
    return response;
}
export default postQuickOrderAPI
