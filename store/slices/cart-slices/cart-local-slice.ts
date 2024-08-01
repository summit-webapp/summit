import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface CartState {
  items: any[];
  error: string | null;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  items: [],
  error: null,
  isLoading: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartList: (state,action) => {
        state.items = action.payload;

      },
    addItemToCart: (state, action: PayloadAction<any>) => {
      const existingItem = state.items?.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if item already exists
      } else {
        state.items.push(action.payload); // Add new item to cart
      }
      state.error = null;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
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
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setLoading,
  setError,
  clearCart,
  addCartList
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cartSlice;

export default cartSlice.reducer;
