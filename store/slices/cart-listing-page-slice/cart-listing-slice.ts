import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCartListing from "../../../services/api/cart-page-api/cart-listing-api";
import { RootState } from "../../root-reducer";
import { stat } from "fs";

export const fetchCartListing: any = createAsyncThunk(
  "CartListing/fetchCartListing",
  async (token: any) => {
    const response = await getCartListing(token);
    console.log("cart res", response);
    return response;
  }
);

interface RepoCartListingState {
  data: any;
  orderCount: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoCartListingState = {
  data: [],
  orderCount: "",
  error: "",
  isLoading: "idle",
};

export const CartListingScreen = createSlice({
  name: "cartListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartListing.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
      state.orderCount = "";
      state.error = "";
    });
    builder.addCase(fetchCartListing.fulfilled, (state, action) => {
      console.log("data payload", action?.payload);

      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.msg === "success"
      ) {
        console.log("data set", action.payload.data);
        state.isLoading = "succeeded";
        state.data = action?.payload?.data?.message?.data;
        state.orderCount =
          action?.payload?.data?.message?.data?.categories?.length;
      } else {
        state.isLoading = "succeeded";
        state.data = [];
        state.orderCount = "";
        state.error = "";
      }
    });
    builder.addCase(fetchCartListing.rejected, (state, action) => {
      state.isLoading = "failed";
      state.data = [];
      state.orderCount = "";
      state.error = "Unable to load cart listing";
    });
  },
});

export const cart_listing_state = (state: RootState) => state.CartListingScreen;

export default CartListingScreen.reducer;
