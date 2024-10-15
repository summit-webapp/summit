import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import fetchProducDetailsFromAPI from '../../../services/api/quick-order-apis/get-product-details';
import { RootState } from '../../root-reducer';
import { object } from 'yup';

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

// export const fetchQuickOrderData = createAsyncThunk('quickOrder/fetchQuickOrderData', async ({ SUMMIT_APP_CONFIG, params, token }: any) => {
//   try {
//     const productData = await fetchProducDetailsFromAPI(SUMMIT_APP_CONFIG, params, token);
//     const message = productData?.data?.message;
//     console.log(message);
//     if (message?.msg === 'success' && Object.keys(message.data)?.length > 0) {
//       return message.data;
//     }
//     if (message?.msg === 'error') {
//       console.warn('Error from API:', message.error);
//        isRejectedWithValue(message.error);
//     }
//     console.warn('No valid data returned');
//     return [];
//   } catch (error) {
//     console.error('API call failed:', error, 'my Eoor');
//     return error;
//   }
// });

export const fetchQuickOrderData = createAsyncThunk(
  'quickOrder/fetchQuickOrderData',
  async ({ SUMMIT_APP_CONFIG, params, token }: any, { rejectWithValue }) => {
    try {
      const productData = await fetchProducDetailsFromAPI(SUMMIT_APP_CONFIG, params, token);
      const message = productData?.data?.message;
      if (message?.msg === 'success' && message.data && Object?.keys(message.data).length > 0) {
        return message.data;
      }
      if (message?.msg === 'error') {
        return rejectWithValue(message.error);
      }
      return rejectWithValue('No valid data returned');
    } catch (error) {
      console.error('API call failed:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

const quickOrderSlice = createSlice({
  name: 'quickOrder',
  initialState,
  reducers: {
    clearQuickOrderData: (state) => {
      state.data = [];
      state.itemList = [];
      state.error = null;
    },
    removeItem: (state, action) => {
      state.data = state.data?.filter((item: any) => item.name !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { item_code, quantity } = action.payload;
      const itemExists = state.itemList?.find((item) => item.item_code === item_code);
      if (itemExists) {
        itemExists.quantity = quantity;
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
        state.error = null;
        state.data = [...state?.data, action.payload];
        const newItem = {
          item_code: action.payload?.name,
          quantity: action.payload?.min_order_qty || 1,
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
