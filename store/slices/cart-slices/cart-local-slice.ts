import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface CartState {
  items: any[];
  cartCount: number;
  error: string | null;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  items: [],
  cartCount: 0,
  error: null,
  isLoading: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartList: (state, action) => {
      state.items = action.payload;
      state.cartCount = state?.items?.length;
    },
    addItemToCart: (state, action: PayloadAction<any>) => {
      if (!state.items) {
        state.items = [];
      }
      const existingItem = state.items?.find((item) => item === action.payload);
      if (existingItem) {
        return;
      } else {
        state.items.push(action.payload); // Add new item to cart
        state.cartCount = state.cartCount + 1 || 1;
      }
      state.error = null;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item !== action.payload);
      state.cartCount = state.cartCount - 1;
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
      state.cartCount = 0
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, setLoading, setError, clearCart, addCartList } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cartSlice;

export default cartSlice.reducer;
