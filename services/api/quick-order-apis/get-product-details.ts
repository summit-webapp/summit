import { executeGETAPI } from '../../../utils/http-methods';

const fetchProducDetailsFromAPI = async (appName: any, reqParams: any, token: any) => {
  const additionalParams = {
    item: JSON.stringify({
      ...reqParams,
    }),
  };

  // Use executeGETAPI to handle GET Request logic
  const response = await executeGETAPI(appName, 'quick-order-api', token, additionalParams);

  return response;
};

export default fetchProducDetailsFromAPI;
