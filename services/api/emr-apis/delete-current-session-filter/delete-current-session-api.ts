import { callPostAPI } from '../../../../utils/http-methods';
import { CONSTANTS } from '../../../config/app-config';

const deleteCurrentSession = async (apiBody: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/delOrdDsg`;
  const response = await callPostAPI(url, apiBody, `Bearer ${token}`);
  return response;
};

export default deleteCurrentSession;
