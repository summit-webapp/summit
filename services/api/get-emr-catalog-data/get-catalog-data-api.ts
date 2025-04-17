import { CONSTANTS } from '../../config/app-config';
import { callPostAPI } from '../../../utils/http-methods';

const fetchProductsData = async (apiBody: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/getCatalogues`;
  const response = await callPostAPI(url, apiBody, undefined);
  return response;
};

export default fetchProductsData;
