export const CONSTANTS = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  SUMMIT_APP_CONFIG: {
    app_name: '/api/method/summitapp.sdk.api',
    version: 'v2',
  },
  ALLOW_GUEST_TO_ACCESS_SITE_EVEN_WITHOUT_AUTHENTICATION: true,
  ENABLE_META_TAGS: true,
  ENABLE_LOGIN_USING_OTP: false,
  ENABLE_LOGIN_USING_GOOGLE_ID: false,
  ENABLE_BULK_ORDER: false,
  ENABLE_APPLY_COUPON_CODE: false,
  ENABLE_STORE_CREDIT: false,
  ENABLE_REDIRECT_FEATURE: false,
  ENABLE_PRODUCT_ENQUIRY_FEATURE: false,
  USE_SINGLE_ENQUIRY: false,
  DOES_PRODUCT_HAS_VARIANTS: false,
  QUICK_ORDER_FIELD: 'oem_part_number',
  SHOW_MORE_ITEMS: 'paginate',
  PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE: 20,
  ENABLE_MISSING_PARTS: false,
  SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST: false,
  SHOW_FUTURE_STOCK_AVAILABILITY: false,
  ADD_TO_CART_FOR_GUEST: false,
  SHOW_TRANSPORTERS_LIST_TO_DEALER: false,
  ALLOW_REQUEST_QUOTATION: false,
  ENABLE_SEARCH_TEXT: false,
  ENABLE_PAYMENT_INTEGRATION: false,
  DEFAULT_CURRENCY_VALUE: 'rupee',
  DEFAULT_LANGUAGE: 'en',
  ENABLE_SHOP_ON_AMAZON: false,
};
