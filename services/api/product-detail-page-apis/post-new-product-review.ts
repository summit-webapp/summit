import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executePOSTAPI } from '../../../utils/http-methods';

const PostProductReviewAPI = async (appConfig: APP_CONFIG, apiBody: any, token?: any) => {
  const response = await executePOSTAPI(appConfig, 'add-product-review', apiBody, token);
  return response;
};

export default PostProductReviewAPI;
