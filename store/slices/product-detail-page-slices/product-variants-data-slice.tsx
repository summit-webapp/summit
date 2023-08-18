import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import { fetchProductVariant } from "../../../services/api/product-detail-page-api/product-variants-data-api";

export const ProductVariantsThunk = createAsyncThunk(
  "product-variants-data-slice/fetchProductDetailData",
  async (params: any) => {
    const { productID, token } = params;

    const getProductVariants = await fetchProductVariant(productID, token);
    return getProductVariants;
  }
);

interface ProductVariantsDataState {
  msg: string;
  data: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  msg: "",
  data: {},
} as ProductVariantsDataState;

const productVariantsSlice = createSlice({
  name: "product-variants-data-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ProductVariantsThunk.pending, (state, action) => {
      state.msg = "";
      state.data = {};
      state.loading = "pending";
    });
    builder.addCase(ProductVariantsThunk.fulfilled, (state, action) => {
      if (
        action.payload.status === 200 &&
        action.payload.data.hasOwnProperty("message")
      ) {
        state.loading = "succeeded";
        state.msg = action.payload.data.message.msg;
        state.data = Array.isArray(action.payload.data.message.data)
          ? action.payload.data.message.data[0]
          : action.payload.data.message.data;
      }
      else {
        state.loading = "succeeded";
        state.msg = "";
        state.data = {}
      }
    });
    builder.addCase(ProductVariantsThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.msg = "";
      state.data = [];
    });
  },
});

export const product_variants_selector_state = (state: RootState) =>
  state.ProductVariantsDataScreen;

export default productVariantsSlice.reducer;