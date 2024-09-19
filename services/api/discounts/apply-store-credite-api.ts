import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executePOSTAPI } from '../../../utils/http-methods';

const PostApplyStoreCreditAPI: any = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  const response = await executePOSTAPI(appConfig, 'apply-store-credit-api', apiBody, token);
  return response;
};

export default PostApplyStoreCreditAPI;
