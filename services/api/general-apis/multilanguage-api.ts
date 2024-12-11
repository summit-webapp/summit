import axios from 'axios';
import { CONSTANTS } from '../../config/app-config';
import APP_CONFIG from '../../../interfaces/app-config-interface';
import { executeGETAPI } from '../../../utils/http-methods';

const getMultiLingualTextFromAPI = async (appConfig: APP_CONFIG) => {
  let response: any;
  const additionalParams = {}; // Add additional parameters if needed
  // Use executeGETAPI to handle GET Request logic
  const MultiLanguagesList = await executeGETAPI(
    appConfig,
    'multi-language-data-api',
    undefined,
    additionalParams // Pass additional parameters if needed
  );
  const langTransmethod = 'get_translation_text';
  const langTransentity = 'translation';
  let generateMultiLingualArrayOfData: any = [];
  if (MultiLanguagesList?.status === 200 && Array.isArray(MultiLanguagesList?.data?.message)) {
    generateMultiLingualArrayOfData =
      MultiLanguagesList?.data?.message?.length > 0
        ? await Promise.all(
            MultiLanguagesList?.data?.message.map(async (lang: any) => {
              try {
                const res = await axios.get(
                  `${CONSTANTS.API_BASE_URL}${CONSTANTS.SUMMIT_APP_CONFIG?.app_name}?version=${CONSTANTS.SUMMIT_APP_CONFIG.version}&method=${langTransmethod}&entity=${langTransentity}&language_code=${lang.language_code}`,
                  { timeout: 5000 }
                );
                return {
                  lang_name: lang.language_name,
                  lang_code: lang.language_code,
                  value: res?.data?.message,
                };
              } catch (err: any) {
                if (err.code === 'ECONNABORTED') {
                  response = 'Request timed out';
                } else if (err.code === 'ERR_BAD_REQUEST') {
                  response = 'Bad Request';
                } else if (err.code === 'ERR_INVALID_URL') {
                  response = 'Invalid URL';
                } else {
                  response = err;
                }
              }
            })
          )
        : [];
  }
  return generateMultiLingualArrayOfData;
};

export default getMultiLingualTextFromAPI;
