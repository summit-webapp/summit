import { combineReducers } from "@reduxjs/toolkit";
import CacheReducer from "./slices/general_slices/cache-slice";
import NavbarReducer from "./slices/general_slices/navbar_slice";
import HomeBannerReducer from "./slices/home_page_slice/home-banners-slice";
import HomeTopCategoriesReducer from "./slices/home_page_slice/home-top-categories-slice";
import HomeTopBrandReducer from "./slices/home_page_slice/home-brand-slice";
import HomeDisplayTagReducer from "./slices/home_page_slice/home-display-tag-slice";
import LoginReducer from "./slices/auth/login_slice";
import registrationDataReducer from "./slices/auth/registration_slice";
import notifications from "./slices/general_slices/toast_notification_slice";
import ShippinAddressReducer from "./slices/checkoutPage-slice/customer-shipping-address-slice";
import BillingAddressReducer from "./slices/checkoutPage-slice/customer-billing-address-slice";
import OrderSummaryReducer from "./slices/checkoutPage-slice/order-summary";
import StoreAddressReducer from "./slices/checkoutPage-slice/store-customer-address-slice";
import ProductListingReducer from "./slices/product-listing-page-slices/product-listing-slice";
import FiltersReducer from "./slices/product-listing-page-slices/filters-slice";
import ProductsViewReducer from "./slices/product-listing-page-slices/view-slice";
import ProductDetailDataReducer from "./slices/product-detail-page-slices/product-detail-data-slice";
import ProductVariantsDataReducer from "./slices/product-detail-page-slices/product-variants-data-slice";
import ProductMatchingItemsReducer from "./slices/product-detail-page-slices/product-item-options-slice";
import StockAvailabilityReducer from "./slices/product-detail-page-slices/product-stock-availability-slice";
import ProfileDataReducer from "./slices/general_slices/profile-page-slice";
import CartListingReducer from "./slices/cart-listing-page-slice/cart-listing-slice";
import OrderListingReducer from "./slices/order-listing-page-slice/order-listing-page-slice";
import WishlistReducer from "./slices/wishlist-slice/wishlist-slice";
import SelectedLanguageReducer from "./slices/language-slice/selected-language-slice";
import LanguageReducer from "./slices/language-slice/language-json-slice";
import BreadCrumbsReducer from "./slices/general_slices/breadcrumbs-slice";
import CurrencyReducer from "./slices/general_slices/multi-currency-slice";
import QuickOrderReducer from "./slices/general_slices/quick-order-slice";
import GetAccessTokenReducer from "./slices/auth/token-login-slice";
import CatalogListReducer from "./slices/catalog-page-slice/get-catalog-slice";
import MultiLanguageReducer from "./slices/general_slices/multilang-slice";
import SelectedFilterLangDataScreen from "./slices/general_slices/selected-multilanguage-slice";
import DealerledgerSummary from "./slices/dealer-ledger-slice/dealer-ledger-summary";
import Dealerledger from "./slices/dealer-ledger-slice/dealer-ledger-slice";

const appReducer = combineReducers({
  CacheScreen: CacheReducer,
  NavbarScreen: NavbarReducer,
  HomeBannerScreen: HomeBannerReducer,
  HomeTopCategoriesScreen: HomeTopCategoriesReducer,
  HomeTopBrandScreen: HomeTopBrandReducer,
  HomeDisplayTagScreen: HomeDisplayTagReducer,
  LoginScreen: LoginReducer,
  RepoRegistrationScreen: registrationDataReducer,
  notifications: notifications,
  ShippingAddressScreen: ShippinAddressReducer,
  BillingAddressScreen: BillingAddressReducer,
  OrderSummaryScreen: OrderSummaryReducer,
  StoreAddressScreen: StoreAddressReducer,
  ProductListingScreen: ProductListingReducer,
  FiltersScreen: FiltersReducer,
  ProductsViewScreen: ProductsViewReducer,
  ProductDetailDataScreen: ProductDetailDataReducer,
  ProductVariantsDataScreen: ProductVariantsDataReducer,
  StockAvailabilityScreen: StockAvailabilityReducer,
  CartListingScreen: CartListingReducer,
  ProductMatchingItemsScreen: ProductMatchingItemsReducer,
  OrderListingScreen: OrderListingReducer,
  ProfileDataScreen: ProfileDataReducer,
  WishlistScreen: WishlistReducer,
  SelectedLanguageScreen: SelectedLanguageReducer,
  LanguagesScreen: LanguageReducer,
  CurrencyScreen: CurrencyReducer,
  BreadCrumbsScreen: BreadCrumbsReducer,
  QuickOrderScreen: QuickOrderReducer,
  GetAccessTokenScreen: GetAccessTokenReducer,
  CatalogListScreen: CatalogListReducer,
  MultilanguageScreen: MultiLanguageReducer,
  SelectedFilterLangDataScreen: SelectedFilterLangDataScreen,
  DealerledgerSummaryScreen: DealerledgerSummary,
  DealerledgerScreen: Dealerledger,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "Login/LogoutSuccess") {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;