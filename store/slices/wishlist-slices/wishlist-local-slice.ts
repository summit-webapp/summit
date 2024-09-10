import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface WishlistState {
  items: any;
  error: string | null;
  wislistCount: number;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: WishlistState = {
  items: [],
  error: null,
  wislistCount: 0,
  isLoading: 'idle',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishList: (state, action) => {
      state.items = action?.payload?.data;
      state.wislistCount = action?.payload?.wishlist_count;
    },
    addItemToWishlist: (state, action) => {
      state.items?.push(action.payload);
      state.wislistCount = state.wislistCount + 1;
      state.error = null;
    },
    removeItemFromWishlist: (state, action) => {
      state.items = state.items?.filter((item: any) => item.name !== action.payload);
      state.wislistCount = state.wislistCount - 1;
      state.error = null;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist, addWishList } = wishlistSlice.actions;

export const selectWishlist = (state: RootState) => state.wishlistSlice;

export default wishlistSlice.reducer;
