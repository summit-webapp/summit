import { executeGETAPI, executePOSTAPI } from '../../utils/http-methods';
import { CONSTANTS } from '../../services/config/app-config';

const executeSummitAPIHandler = (apiMethod: string, apiName: string, apiData: any, token?: string, path?: string) => {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  if (apiMethod === 'GET') {
    return executeGETAPI(SUMMIT_APP_CONFIG, apiName, token, apiData, path);
  } else if (apiMethod === 'POST') {
    return executePOSTAPI(SUMMIT_APP_CONFIG, apiName, apiData, token);
  }
};

export default executeSummitAPIHandler;
