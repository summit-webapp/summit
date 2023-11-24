import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetProductReviewAPI from "../../../../services/api/product-detail-page-api/product-review-api/get_product_review_api";
import { RootState } from "../../../root-reducer";

const initialState: {
    data: any ;
    loading: boolean;
    error: string ;
} = {
    data: [],
    loading: false,
    error: ''
}

export const fetchProductReview = createAsyncThunk(
    "ProductReview/fetchProductReview",
    async (item_code:any) => {
        console.log('product item code',item_code)
        try {
            const response = await GetProductReviewAPI(item_code)
            return response
        } catch (error) {
            throw error
        }

    }
)

const productReviewSlice = createSlice({
    name: "ProductReview",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReview.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductReview.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductReview.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error =  "An error occured";
            })
    }
})

export const product_review_from_store = (state: RootState)  => state.ProductReview
export default productReviewSlice.reducer;