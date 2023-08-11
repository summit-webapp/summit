import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductListing } from "../../../services/api/product-listing-page-api/get-product-list-api";
import { RootState } from "../../root-reducer";
import { ProductData } from "../../../interfaces/products-view-interface";
import { MissingPartsAPI } from "../../../services/api/product-listing-page-api/missing-parts-api";

export const ProductListingThunk = createAsyncThunk(
  "product-listing-slice/fetchProductListing",
  async (params: any) => {
    const { storeUsefulParamsForFurtherProductListingApi } = params;
    const getProductListingData = await fetchProductListing(
      storeUsefulParamsForFurtherProductListingApi
    );
    if (
      getProductListingData?.data?.message?.data?.length === 0 &&
      storeUsefulParamsForFurtherProductListingApi.url_params?.hasOwnProperty(
        "search_text"
      )
    ) {
      const missingPartsApiRes = await MissingPartsAPI(
        storeUsefulParamsForFurtherProductListingApi?.token,
        storeUsefulParamsForFurtherProductListingApi.url_params?.search_text,
        null
      );
    }
    return getProductListingData;
  }
);

interface ProductListingState {
  msg: string;
  error: string;
  productListData: ProductData[];
  productsTotalCount: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  msg: "",
  error: "",
  productListData: [],
  productsTotalCount: 0,
  loading: "idle",
} as ProductListingState;

const productListingSlice = createSlice({
  name: "product-listing-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ProductListingThunk.pending, (state, action) => {
      state.loading = "pending";
      state.msg = "";
      state.productListData = [];
      state.productsTotalCount = 0;
      state.error = "";
    });
    builder.addCase(ProductListingThunk.fulfilled, (state, action) => {
      console.log("product listing success", action);
      if (
        action.payload.status === 200 &&
        action.payload.data.hasOwnProperty("message") &&
        action.payload.data.message.hasOwnProperty("data")
      ) {
        state.loading = "succeeded";
        state.msg = "success";
        state.productListData = action.payload.data.message.data;
        state.productsTotalCount = action.payload.data.message.total_count;
        state.error = "";
      } else {
        state.loading = "succeeded";
        state.msg = "";
        state.productListData = [];
        state.productsTotalCount = 0;
        state.error = "Error Fetching Data";
      }
    });
    builder.addCase(ProductListingThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.msg = "";
      state.productListData = [];
      state.productsTotalCount = 0;
      state.error = "Network Error";
    });
  },
});

export const product_listing_selector_state = (state: RootState) =>
  state.ProductListingScreen;

export default productListingSlice.reducer;
