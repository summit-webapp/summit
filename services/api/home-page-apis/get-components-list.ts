import engineRunner from '../../../utils/engine-runner';

const getComponentsList = async (apiMethod: string, apiName: string, apiData?: any, token?: string, path?: string) => {
  const response = await engineRunner(apiMethod, apiName, apiData, token, path);
  return response;
};

export default getComponentsList;
