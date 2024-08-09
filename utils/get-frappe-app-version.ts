import { CONSTANTS } from '../services/config/app-config';
const fetchFrappeAppVersion = (frappeAppName: string) => {
  if (frappeAppName === CONSTANTS.SUMMIT_API_SDK) {
    return CONSTANTS.SUMMIT_API_SDK_VERSION;
  } else if (frappeAppName === CONSTANTS.CUSTOM_API_SDK) {
    return CONSTANTS.CUSTOM_API_SDK_VERSION;
  } else {
    return '0.0.0';
  }
};

export default fetchFrappeAppVersion;
