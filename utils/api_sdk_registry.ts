import { CONSTANTS } from '../services/config/app-config';
const { CUSTOM_API_SDK } = CONSTANTS;

const apiSdkRegistry: any = {
  'navbar-api': '',
  'banner-api': '',
  'display-tags-api': '',
  'order-list-api': CUSTOM_API_SDK,
  'cart-list-api': CUSTOM_API_SDK,
  'breadcrums-api': '',
  'product-list-api': '',
  'get-listing-filters-api': '',
  'product-detail-api': '',
  'product-variants-api': '',
  'order-detail-api': CUSTOM_API_SDK,
  'wishlist-api': '',
};

export default apiSdkRegistry;
