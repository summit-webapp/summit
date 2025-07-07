import engineRunner from '../../../utils/engine-runner';

export const MetaTag = async (apiMethod: string, apiName: string, apiData?: any, url?: any, token?: string, path?: string) => {
  const apiParams = url ? `${apiData}&page_name=${url}` : apiData;
  return await engineRunner(apiMethod, apiName, apiParams, token, path);
};

export default MetaTag;
