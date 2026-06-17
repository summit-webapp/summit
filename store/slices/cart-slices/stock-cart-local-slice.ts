import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface CartState {
  items: any[];
  stockCartCount: any;
  grandTotal: number;
  error: string | null;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  quotation_Id: string;
}

const initialState: CartState = {
  items: [],
  stockCartCount: 0,
  grandTotal: 0,
  error: null,
  isLoading: 'idle',
  quotation_Id: '',
};

const cartSlice = createSlice({
  name: 'stockCart',
  initialState,
  reducers: {
    addStockCartList: (state, action) => {
      state.items = action.payload?.cartData;
      state.stockCartCount = action.payload.stockCartCount;
      state.grandTotal = action.payload.grandTotal;
      state.quotation_Id = action?.payload?.quotationId;
    },
    addItemToStockCart: (state, action) => {
      if (!state.items) {
        state.items = [];
      }
      const mergedArray = [...state?.items, ...action?.payload.filter((item: any) => !state?.items.includes(item))];
      state.items = mergedArray;
      state.stockCartCount = state?.items?.length || 1;

      state.error = null;
    },
    removeItemFromStockCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item !== action.payload);
      state.stockCartCount = state.stockCartCount - 1;
      state.error = null;
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.error = null;
      state.stockCartCount = 0;
    },
  },
});
export const { addItemToStockCart, removeItemFromStockCart, updateItemQuantity, setLoading, setError, clearCart, addStockCartList } = cartSlice.actions;

export const selectStockCart = (state: RootState) => state.stockCart;

export default cartSlice.reducer;
