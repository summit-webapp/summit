import engineRunner from '../../../utils/engine-runner';

const getSiteMapList = async (apiMethod: string, apiName: string, apiData?: any, token?: string, path?: string) => {
  const response = await engineRunner(apiMethod, apiName, apiData, token, path);
  return response;
};

export default getSiteMapList;
