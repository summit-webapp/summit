import { combineReducers } from '@reduxjs/toolkit';
import { resetStore } from './slices/auth/logout-slice';
import GetAccessTokenReducer from './slices/auth/token-login-slice';
import cartLocalSlice from './slices/cart-slices/cart-local-slice';
import catalogLocalSlice from './slices/catalog-slice/catalog-local-slice';
import CurrencyReducer from './slices/general_slices/multi-currency-slice';
import MultiLanguageReducer from './slices/general_slices/multilang-slice';
import SelectedFilterLangDataScreen from './slices/general_slices/selected-multilanguage-slice';
import LanguageReducer from './slices/language-slice/language-json-slice';
import wishlistSlice from './slices/wishlist-slices/wishlist-local-slice';
import quickOrderSlice from './slices/quick-order-slice/quick-order-slice';
import componentsReducer from './slices/general_slices/components-slice';

const appReducer = combineReducers({
  LanguagesScreen: LanguageReducer,
  CurrencyScreen: CurrencyReducer,
  GetAccessTokenScreen: GetAccessTokenReducer,
  MultilanguageScreen: MultiLanguageReducer,
  ComponentsScreen: componentsReducer,
  SelectedFilterLangDataReducer: SelectedFilterLangDataScreen,
  wishlistSlice: wishlistSlice,
  cart: cartLocalSlice,
  catalogSlice: catalogLocalSlice,
  quickOrder: quickOrderSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === resetStore.type) {
    return appReducer(undefined, action);
    // state = {}; // Clear the entire state
  } else {
    return appReducer(state, action);
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
