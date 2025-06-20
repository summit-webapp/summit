const emrAPISDKRegistry: any = {
  'login-api': '/api/login',
  'get-page-components-list-api': '/api/getComponents',
  'get-collections-list-api': '/api/getDsgCollections',
  'get-current-session-filters-api': '/api/getCsFilters',
  'post-insert-current-session-filters-api': '/api/insertCsFltrs',
  'get-product-listing-filters-api': '/api/getCatalogueFilterMasters',
  'get-product-listing-y-filters-api': '/api/getyCatalogueFilterMasters',
  'get-product-list-api': '/api/getDesigns',
  'delete-current-session-filters-api': '/api/delOrdDsg',
  'post-move-current-session-api': '/api/copyDesign',
  'product-detail-api': '/api/getDesignDetails',
  'cart-list': '/api/getOrdDsgList',
  'update-cart': '/api/updateOrdDsg',
  'delete-cart': '/api/clearOrderDsg',
  'place-order-api': '/api/createOrder',
  'price-list-api': '/api/fetchPrice',
  'get-site-map': '/api/collection-urls',
  'get-product-design-y-options': '/api/getyDsgConfg',
  'refresh-price-api': '/api/refreshPrice'
};

export default emrAPISDKRegistry;
