import { executeEMRDeleteAPI, executeEMRGetAPI, executeEMRPostAPI, executeEMRPutAPI } from '../../utils/http-methods';

const executeEMRAPIHandler = (apiMethod: string, apiName: string, apiData: string, token?: string, path?: string) => {
  if (apiMethod === 'GET') {
    return executeEMRGetAPI(apiName, apiData, token, path);
  } else if (apiMethod === 'POST') {
    return executeEMRPostAPI(apiName, apiData, token, path);
  } else if (apiMethod === 'PUT') {
    return executeEMRPutAPI(apiName, apiData, token, path);
  } else if (apiMethod === 'DELETE') {
    return executeEMRDeleteAPI(apiName, apiData, token, path);
  }
};

export default executeEMRAPIHandler;
