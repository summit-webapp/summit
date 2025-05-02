import engineRunner from '../../../utils/engine-runner';

const getComponentsList = async (apiMethod: string, apiName: string, apiData?: any, token?: string, path?: string) => {
  const response = await engineRunner(apiMethod, apiName, apiData, token, path);
  console.log('components list api', response);
  return response;
};

export default getComponentsList;
