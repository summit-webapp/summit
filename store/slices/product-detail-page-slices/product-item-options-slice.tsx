import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import { fetchProductMatchingItems } from "../../../services/api/product-detail-page-api/product-mandatory-items-api";

export const ProductMatchingItemOptions = createAsyncThunk(
  "product-matching-item-options-slice/fetchProductItemOptions",
  async (params: any) => {

    const { productID, currency, token } = params;
    const getProductMatchingItemsOptionsData = await fetchProductMatchingItems(
      productID, currency, token
    );
    return getProductMatchingItemsOptionsData;
  }
);

interface ProductMatchingItemsState {
  data: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  data: [],
} as ProductMatchingItemsState;


const productMatchingItemsSlice = createSlice({
  name: "product-matching-item-options-slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(ProductMatchingItemOptions.pending, (state, action) => {
      state.loading = "pending";
      state.data = [];
    });
    builder.addCase(ProductMatchingItemOptions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload
    });
    builder.addCase(ProductMatchingItemOptions.rejected, (state, action) => {
      state.loading = "failed";
      state.data = [];
    })
  },
})

export const product_matching_items_selector_state = (state: RootState) =>
  state.ProductMatchingItemsScreen
export default productMatchingItemsSlice.reducer