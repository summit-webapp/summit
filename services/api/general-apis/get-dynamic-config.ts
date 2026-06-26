import { executeEMRGetAPI } from '../../../utils/http-methods';

const fetchDynamicConfig = async (appConfig: any, requestParams: any, token: any) => {
  // Use executeEMRGetAPI because this is a direct EMR Node backend API, not a Frappe API
  const response = await executeEMRGetAPI(
    'get-dynamic-config-api' as any,
    requestParams,
    token
  );

  return response;
};

export default fetchDynamicConfig;
