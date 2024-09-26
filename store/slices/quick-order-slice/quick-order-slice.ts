import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProducDetailsFromAPI from '../../../services/api/quick-order-apis/get-product-details';
import { RootState } from '../../root-reducer';

interface QuickOrderState {
  data: any[];
  loading: boolean;
  error: string | null;
  itemList: { item_code: string; quantity: number }[];
}

const initialState: QuickOrderState = {
  data: [],
  loading: false,
  error: null,
  itemList: [],
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
    clearQuickOrderData: (state) => {
      state.data = [];
      state.itemList = [];
    },
    removeItem: (state, action) => {
      state.data = state.data?.filter((item: any) => item.name !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { item_code, quantity } = action.payload;
      const itemExists = state.itemList?.find((item) => item.item_code === item_code);
      if (itemExists) {
        itemExists.quantity = quantity; // Update the quantity for existing item
      }
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
        const newItem = {
          item_code: action.payload?.name,
          quantity: action.payload?.min_order_qty,
        };

        state.itemList = [...state?.itemList, newItem];
      })
      .addCase(fetchQuickOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuickOrderData, removeItem, updateItemQuantity } = quickOrderSlice.actions;
export const selectQuickOrderState = (state: RootState) => state.quickOrder;

export default quickOrderSlice.reducer;
