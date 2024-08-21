import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executePOSTAPI } from '../../../utils/http-methods';

export const PostAddToCartAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  const response = await executePOSTAPI(appConfig, 'add-cart-api', apiBody, token);
  return response;
};
