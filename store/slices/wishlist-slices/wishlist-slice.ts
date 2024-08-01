import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../root-reducer';
import { AddProductToWishlist, DeleteProductFromWishlist, GetWishlistData } from '../../../services/api/wishlist-apis/wishlist-api';

export const fetchWishlistUser: any = createAsyncThunk('wishlist/fetchWishlistUser', async (request: any) => {
  let userWishList: any;
  if (request.addTowishlist === true) {
    userWishList = await AddProductToWishlist(request);
  } else if (request.getWishlist === true) {
    userWishList = await GetWishlistData(request);
  } else if (request.deleteWishlist === true) {
    userWishList = await DeleteProductFromWishlist(request);
  } else {
    return null;
  }
  return userWishList;
});

interface RepoWishlistState {
  user: any;
  error: any;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoWishlistState = {
  user: [],
  error: '',
  isLoading: 'idle',
};

export const WishlistScreen = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistUser.pending, (state) => {
      state.isLoading = 'pending';
      state.user = [];
      state.error = '';
    });
    builder.addCase(fetchWishlistUser.fulfilled, (state, action) => {
      if (action?.payload?.status === 200 && action?.payload?.data?.message?.msg === 'success') {
        state.user = action?.payload?.data?.message;
        state.error = '';
        state.isLoading = 'succeeded';
      } else {
        state.isLoading = 'succeeded';
        state.user = '';
        state.error = 'Product is not added in wishlist';
      }
    });
    builder.addCase(fetchWishlistUser.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.user = '';
      state.error = 'Product fail to add in wishlist';
    });
  },
});

export const wishlist_state = (state: RootState) => state.WishlistScreen;

export default WishlistScreen.reducer;
