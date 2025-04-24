import { CONSTANTS } from '../../../config/app-config';
import { callPostAPI } from '../../../../utils/http-methods';

const createVoucher = async (apiBody: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/moveDsg`;
  const response = await callPostAPI(url, apiBody, `Bearer ${token}`);
  return response;
};

export default createVoucher;
