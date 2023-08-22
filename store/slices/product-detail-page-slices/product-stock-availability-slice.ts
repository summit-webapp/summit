import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getStockAvailability from "../../../services/api/product-detail-page-api/product-stock-availability-api";
import { RootState } from "../../root-reducer";

export const fetchStockAvailability: any = createAsyncThunk(
  "stockAvailability/fetchStockAvailability",
  async (params) => {
    const { item_code, qty, token }: any = params;

    const respnse = await getStockAvailability(item_code, qty, token);
    return respnse;
  }
);

interface RepoStockState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoStockState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const StockAvailabilityScreen = createSlice({
  name: "stockAvailability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStockAvailability.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
    });
    builder.addCase(fetchStockAvailability.fulfilled, (state, action) => {
      {
        if (
          action?.payload?.status === 200 &&
          action?.payload?.data?.hasOwnProperty("message")
        ) {
          state.isLoading = "succeeded";
          state.data = action.payload.data.message.data;
        } else {
          state.isLoading = "succeeded";
          state.error = "";
          state.data = [];
        }
      }
    });

    builder.addCase(fetchStockAvailability.rejected, (state) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load addresses";
    });
  },
});

export const stock_availability_state = (state: RootState) =>
  state.StockAvailabilityScreen;

export default StockAvailabilityScreen.reducer;
