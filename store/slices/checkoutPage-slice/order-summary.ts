import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getOrderSummary from "../../../services/api/checkout-page-api/order-summary";

export const fetchOrderSummary: any = createAsyncThunk(
  "orderSummary/fetchOrderSummary",
  async (request: any) => {
    console.log("order summary in slice", request);
    const orderSummaryData = await getOrderSummary(request);
    return orderSummaryData;
  }
);

interface RepoOrderSummaryState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoOrderSummaryState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const OrderSummaryScreen = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderSummary.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
    });

    builder.addCase(fetchOrderSummary.fulfilled, (state, action) => {
      if (action?.payload?.status === 200 && action?.payload?.data?.message?.msg === "success") {
        state.isLoading = "succeeded";
        state.data = action?.payload?.data?.message?.data;
      } else {
        state.isLoading = "succeeded"
        state.data = [];
        state.error = "";
      }
    });

    builder.addCase(fetchOrderSummary.rejected, (state) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load order summary";
    });
  },
});

export const order_summary_state = (state: RootState) =>
  state.OrderSummaryScreen;

export default OrderSummaryScreen.reducer;
