import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getStockAvailability from '../../../services/api/product-detail-page-api/product-stock-availability-api';
import { RootState } from '../../root-reducer';
import getProductSpecification from '../../../services/api/product-detail-page-api/product-specification-api';

export const fetchProductSpecifications: any = createAsyncThunk('productSpecification/fetchProductSpecifications', async (params) => {
  const { item_code }: any = params;
  console.log('@@product in slice', item_code);
  const respnse = await getProductSpecification(item_code);
  return respnse;
});

interface RepoStockState {
  data: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoStockState = {
  data: [],
  error: '',
  isLoading: 'idle',
};

export const productSpecificationScreen = createSlice({
  name: 'productSpecification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductSpecifications.pending, (state) => {
      state.isLoading = 'pending';
      state.data = [];
    });
    builder.addCase(fetchProductSpecifications.fulfilled, (state, action) => {
      {
        if (action?.payload?.status === 200 && action?.payload?.data?.hasOwnProperty('message')) {
          state.isLoading = 'succeeded';
          state.data = action.payload.data.message.data;
        } else {
          state.isLoading = 'succeeded';
          state.error = '';
          state.data = [];
        }
      }
    });

    builder.addCase(fetchProductSpecifications.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = [];
      state.error = 'Unable to load addresses';
    });
  },
});

export const product_specification_state = (state: RootState) => state.productSpecification;

export default productSpecificationScreen.reducer;
