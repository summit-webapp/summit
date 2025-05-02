import { executeEMRGetAPI, executeEMRPostAPI } from '../../utils/http-methods';

const executeEMRAPIHandler = (apiMethod: string, apiName: string, apiData: string, token?: string, path?: string) => {
  if (apiMethod === 'GET') {
    return executeEMRGetAPI(apiName, apiData, token, path);
  } else if (apiMethod === 'POST') {
    return executeEMRPostAPI();
  }
};

export default executeEMRAPIHandler;
