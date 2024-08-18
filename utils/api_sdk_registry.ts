import { CONSTANTS } from '../services/config/app-config';
const { CUSTOM_API_SDK } = CONSTANTS;

const apiSdkRegistry: any = {
  'registration-api': { version: '', method: 'customer_signup', entity: 'registration' },
  'navbar-api': '',
  'banner-api': '',
  'display-tags-api': '',
  'breadcrums-api': '',
  'get-listing-filters-api': '',
  'product-list-api': '',
  'product-detail-api': '',
  'product-variants-api': '',
  'wishlist-api': '',
  'cart-list-api': CUSTOM_API_SDK,
  'order-list-api': CUSTOM_API_SDK,
  'order-detail-api': CUSTOM_API_SDK,
  'order-reports-api': CUSTOM_API_SDK,
  'customer-item-api': CUSTOM_API_SDK,
};

export default apiSdkRegistry;
