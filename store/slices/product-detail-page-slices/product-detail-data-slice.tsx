import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import { fetchProductDetailData } from "../../../services/api/product-detail-page-api/product-detail-data-api";

export const ProductDetailPageThunk = createAsyncThunk(
  "product-detail-data-slice/fetchProductDetailData",
  async (params: any) => {
    console.log("detail data params", params);
    const { productID, currency, token } = params;
    const getProductDetailData = await fetchProductDetailData(productID, currency, token);
    console.log("detail data in slice", getProductDetailData);
    return getProductDetailData;
  }
);

interface ProductDetailDataState {
  msg: string;
  data: any;
  min_qty: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  msg: "",
  data: {},
  min_qty: ""
} as ProductDetailDataState;

const productDetailSlice = createSlice({
  name: "product-detail-data-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ProductDetailPageThunk.pending, (state, action) => {
      state.msg = "";
      state.data = {};
      state.loading = "pending";
    });
    builder.addCase(ProductDetailPageThunk.fulfilled, (state, action) => {
      if (
        action.payload.status === 200 &&
        action.payload.data.hasOwnProperty("message") &&
        action.payload.data.message.msg !== "error"

      ) {
        console.log("detail payload", action.payload.data)
        state.loading = "succeeded";
        state.msg = action.payload.data.message.msg;
        state.data = Array.isArray(action?.payload?.data?.message?.data)
          ? action?.payload?.data?.message?.data[0]
          : action?.payload?.data?.message?.data;

        state.min_qty = action?.payload?.data?.message?.data[0]?.min_order_qty
      }
      else {
        state.loading = "succeeded";
        state.msg = "";
        state.data = {}
      }
    });
    builder.addCase(ProductDetailPageThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.msg = "";
      state.data = [];
    });
  },
});

export const product_detail_data_selector_state = (state: RootState) =>
  state.ProductDetailDataScreen;

export default productDetailSlice.reducer;