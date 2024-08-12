import { CONSTANTS } from '../services/config/app-config';

const { CUSTOM_API_SDK } = CONSTANTS;

const apiSdkRegistry: any = {
  'navbar-api': '',
  'order-list-api': CUSTOM_API_SDK,
};

export default apiSdkRegistry;
