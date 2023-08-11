import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetCartHistory from "../../../services/api/my-order-api/order-history-api";
import { RootState } from "../../root-reducer";

export const FetchOrderListing: any = createAsyncThunk(
  "orderListing/fetchOrderListing",
  async (request: any) => {
    const response = await GetCartHistory(request);
    console.log("order data", response);
    return response;
  }
);

interface RepoOrderListingState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoOrderListingState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const OrderListingScreen = createSlice({
  name: "cartListing",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(FetchOrderListing.pending, (state: any) => {
      state.isLoading = "pending";
      state.error = "";
    });
    builder.addCase(FetchOrderListing.fulfilled, (state: any, action: any) => {
      console.log("cart payload", action.payload);
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.msg === "success"
      ) {
        state.isLoading = "succeeded";
        state.data = action?.payload?.data?.message?.data;
      } else {
        // state.isLoading = "succeeded";
        state.data = [];
        state.error = "";
      }
    });
    builder.addCase(FetchOrderListing.rejected, (state: any, action: any) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load cart listing";
    });
  },
});

export const order_listing_state = (state: RootState) =>
  state.OrderListingScreen;

export default OrderListingScreen.reducer;
