import { executeGETAPI } from '../../../utils/http-methods';

const getBlogDataAPI = async (
  reqParams: any,
  token: any
) => {
  // const displayTagsList = await callGetAPI(`${CONSTANTS.API_BASE_URL}/api/resource/Tag`, token);
  const additionalParams = { fields: JSON.stringify(reqParams) };

  const response = await executeGETAPI(undefined, '', token, additionalParams, `/api/resource/Blog Post`);
  return response;
};

export default getBlogDataAPI;

