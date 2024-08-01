import { combineReducers } from '@reduxjs/toolkit';
import LanguageReducer from './slices/language-slice/language-json-slice';
import CurrencyReducer from './slices/general_slices/multi-currency-slice';
import GetAccessTokenReducer from './slices/auth/token-login-slice';
import MultiLanguageReducer from './slices/general_slices/multilang-slice';
import SelectedFilterLangDataScreen from './slices/general_slices/selected-multilanguage-slice';
import  WishlistScreen  from './slices/wishlist-slices/wishlist-slice';
import wishlistSlice from './slices/wishlist-slices/wishlist-local-slice';
import cartLocalSlice from './slices/cart-slices/cart-local-slice';

const appReducer = combineReducers({
  LanguagesScreen: LanguageReducer,
  CurrencyScreen: CurrencyReducer,
  GetAccessTokenScreen: GetAccessTokenReducer,
  MultilanguageScreen: MultiLanguageReducer,
  SelectedFilterLangDataScreen: SelectedFilterLangDataScreen,
  WishlistScreen:WishlistScreen,
  wishlistSlice: wishlistSlice,
  cartSlice:cartLocalSlice
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
