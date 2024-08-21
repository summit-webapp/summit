import APP_CONFIG from '../../../interfaces/app-config-interface';
import typeRegistrationProps from '../../../interfaces/registration-interface';
import { executePOSTAPI } from '../../../utils/http-methods';

const registrationAPI = async (appConfig: APP_CONFIG, userFormData: typeRegistrationProps) => {
  let response: any;
  response = await executePOSTAPI(appConfig, 'registration-api', userFormData, undefined);
  return response;
};
export default registrationAPI;
