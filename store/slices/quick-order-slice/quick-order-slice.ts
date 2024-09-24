import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProducDetailsFromAPI from '../../../services/api/quick-order-apis/get-product-details';
import { RootState } from '../../root-reducer';

interface QuickOrderState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: QuickOrderState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchQuickOrderData = createAsyncThunk('quickOrder/fetchQuickOrderData', async ({ SUMMIT_APP_CONFIG, params, token }: any) => {
  let productData: any;
  productData = await fetchProducDetailsFromAPI(SUMMIT_APP_CONFIG, params, token);
  if (productData?.data?.message?.msg === 'success' && Object?.keys(productData?.data?.message?.data)?.length > 0) {
    return productData?.data?.message?.data;
  } else {
    return [];
  }
});

const quickOrderSlice = createSlice({
  name: 'quickOrder',
  initialState,
  reducers: {
    updateQuickOrderData: (state, action) => {
      state.data = action?.payload;
    },
    clearQuickOrderData: (state) => {
      state.data = [];
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item: any) => item.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state?.data, action.payload];
      })
      .addCase(fetchQuickOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuickOrderData, removeItem, updateQuickOrderData } = quickOrderSlice.actions;
export const selectQuickOrderState = (state: RootState) => state.quickOrder;

export default quickOrderSlice.reducer;
