import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import getCartListing from '../../../services/api/cart-page-api/cart-listing-api';

export const fetchCartCount: any = createAsyncThunk('CartCount/fetchCartCount', async (token: any) => {
    const response = await getCartListing(token);
    console.log('cart res', response);
    return response;
});

interface RepoCartCountState {
    totalCartCount: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoCartCountState = {
    totalCartCount: '',
    error: '',
    isLoading: 'idle',
};

export const totalCartCountScreen = createSlice({
    name: 'cartListing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartCount.pending, (state) => {
            state.isLoading = 'pending';
            state.totalCartCount = '';
            state.error = '';
        });
        builder.addCase(fetchCartCount.fulfilled, (state, action) => {
            if (action?.payload?.status === 200 && action?.payload?.data?.message?.msg === 'success') {
                console.log('data set', action.payload.data);
                state.isLoading = 'succeeded';
                state.totalCartCount = action?.payload?.data?.message?.data?.total_qty;
            } else {
                state.isLoading = 'succeeded';
                state.totalCartCount = '';
                state.error = '';
            }
        });
        builder.addCase(fetchCartCount.rejected, (state, action) => {
            state.isLoading = 'failed';
            state.totalCartCount = '';
            state.error = 'Unable to load cart Count';
        });
    },
});

export const cart_count_state = (state: RootState) => state.totalCartCountScreen;

export default totalCartCountScreen.reducer;
