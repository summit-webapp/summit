import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductListTestimonialAPI } from '../../../services/api/product-listing-page-api/product-testimonial-api';
import { RootState } from '../../root-reducer';

export const fetchProductListTestimonial: any = createAsyncThunk(
    'product/fetchProductListTestimonial',
    async (category) => {
        const response = await fetchProductListTestimonialAPI(category);
        return response;
    }
);

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

export const ProductListTestimonial = createSlice({
    name: 'ProductListTestimonial',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductListTestimonial.pending, (state) => {
            state.isLoading = 'pending';
            state.data = [];
        });
        builder.addCase(fetchProductListTestimonial.fulfilled, (state, action) => {
            {
                if (
                    action?.payload?.status === 200 &&
                    action?.payload?.data?.hasOwnProperty('message')
                ) {
                    state.isLoading = 'succeeded';
                    state.data = action.payload.data.message.data;
                } else {
                    state.isLoading = 'succeeded';
                    state.error = '';
                    state.data = [];
                }
            }
        });

        builder.addCase(fetchProductListTestimonial.rejected, (state) => {
            state.isLoading = 'failed';
            state.data = [];
            state.error = 'Unable to load addresses';
        });
    },
});

export const product_list_testimonial = (state: RootState) =>
    state.ProductListTestimonial;

export default ProductListTestimonial.reducer;
