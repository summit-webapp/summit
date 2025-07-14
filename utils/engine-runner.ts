import executeEMRAPIHandler from '../services/api-handlers/emr-api-handler';
import executeSummitAPIHandler from '../services/api-handlers/summit-api-handler';

const engineRunner = (apiMethod: string, apiName: string, apiData: any, token?: string, path?: string) => {
  const engineName = process.env.NEXT_PUBLIC_ENGINE_NAME;
  const handlers: Record<string, Function> = {
    Summit: executeSummitAPIHandler,
    EMR: executeEMRAPIHandler,
  };
  console.log( 'engineName',engineName, apiMethod, apiName)

  const handler = handlers[engineName || ''];
  if (!handler) {
    throw new Error(`Unsupported engine name: ${engineName}`);
  }

  return handler(apiMethod, apiName, apiData, token, path);
};

export default engineRunner;
