// productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import fetchProductListDataOnHome from '../../../services/api/home_page_api/get-product-list-on-home';
import { RootState } from '../../root-reducer';

interface ProductState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProductListOnHome = createAsyncThunk(
  'product/fetchProductListOnHome',
  async () => {
    const getProductListOnHome: any = await fetchProductListDataOnHome();
    console.log('home banner data in slice', getProductListOnHome);
    return getProductListOnHome;
  }
);

const productOnHomeSlice = createSlice({
  name: 'productsOnHome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListOnHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductListOnHome.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProductListOnHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export const product_list_on_home_state = (state: RootState) =>
  state.productListOnHome;

export default productOnHomeSlice.reducer;
