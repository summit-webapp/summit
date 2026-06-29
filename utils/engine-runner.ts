import executeEMRAPIHandler from '../services/api-handlers/emr-api-handler';
import executeSummitAPIHandler from '../services/api-handlers/summit-api-handler';

const engineRunner = (apiMethod: string, apiName: string, apiData: any, token?: string, path?: string, isBlob: boolean = false) => {
  const engineName = process.env.NEXT_PUBLIC_ENGINE_NAME;
  const handlers: Record<string, Function> = {
    Summit: executeSummitAPIHandler,
    EMR: executeEMRAPIHandler,
  };

  const handler = handlers[engineName || ''];
  if (!handler) {
    throw new Error(`Unsupported engine name: ${engineName}`);
  }

  return handler(apiMethod, apiName, apiData, token, path, isBlob);
};

export default engineRunner;
