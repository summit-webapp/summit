const apiSdkRegistry: any = {
  'registration-api': { version: '', method: 'customer_signup', entity: 'registration' },
  'navbar-api': { version: '', method: 'get_mega_menu', entity: 'mega_menu' },
  'banner-api': { version: '', method: 'get', entity: 'banner' },
  'display-tags-api': { version: '', method: 'get_tagged_products', entity: 'product' },
  'breadcrums-api': { version: '', method: 'breadcrums', entity: 'mega_menu' },
  'get-listing-filters-api': { version: '', method: 'get_filters', entity: 'filter' },
  'product-list-api': { version: '', method: 'get_list', entity: 'product' },
  'product-detail-api': { version: '', method: 'get_details', entity: 'product' },
  'product-variants-api': { version: '', method: 'get_variants', entity: 'variant' },
  'wishlist-api': { version: '', method: 'get_wishlist_items', entity: 'wishlist' },
  'cart-list-api': { version: '', method: 'get_list', entity: 'cart' },
  'order-list-api': { version: '', method: 'get_list', entity: 'order' },
  'order-detail-api': { version: '', method: 'get_order_details', entity: 'order' },
  'order-reports-api': { version: '', method: '', entity: '' },
};

export default apiSdkRegistry;
