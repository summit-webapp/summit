import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getShippingAddress from "../../../services/api/checkout-page-api/customer-shipping-address-api";

export const fetchShippingAddress: any = createAsyncThunk(
  "shippingAddress/fetchShippingAddress",
  async (token: any) => {
    const shippingData = await getShippingAddress(token);
    console.log("shipping address", shippingData);
    return shippingData;
  }
);
interface RepoShippingAddState {
  items: any;
  error: string;
  initialShippingAddressID: any;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoShippingAddState = {
  items: [],
  error: "",
  initialShippingAddressID: "",
  isLoading: "idle",
};

export const ShippingAddressScreen = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShippingAddress.pending, (state) => {
      state.isLoading = "pending";
      state.items = [];
    });
    builder.addCase(fetchShippingAddress.fulfilled, (state, action) => {
      console.log("payload data in shipp", action.payload);
      if (action?.payload?.length > 0) {
        state.isLoading = "succeeded";
        state.items = action?.payload;
        state.initialShippingAddressID = action?.payload[0]?.address_id;
      } else {
        state.isLoading = "failed";
        state.items = [];
      }
    });
    builder.addCase(fetchShippingAddress.rejected, (state, action) => {
      state.isLoading = "failed";
      state.items = [];
      state.error = "Unable to load brands";
    });
  },
});

export const shipping_address_state = (state: RootState) =>
  state.ShippingAddressScreen;

export default ShippingAddressScreen.reducer;
