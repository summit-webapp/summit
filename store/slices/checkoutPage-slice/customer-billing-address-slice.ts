import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getBillingAddress from "../../../services/api/checkout-page-api/customer-billing-address-api";

export const fetchBillingAddress: any = createAsyncThunk(
  "billingAddress/fetchBillingAddress",
  async (token: any) => {
    const billingData = await getBillingAddress(token);
    console.log("billing data in store", billingData);
    return billingData;
  }
);

interface RepoBillingAddState {
  items: any;
  error: string;
  initialBillingAddressID: any;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoBillingAddState = {
  items: [],
  error: "",
  initialBillingAddressID: "",
  isLoading: "idle",
};

export const BillingAddressScreen = createSlice({
  name: "billingAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBillingAddress.pending, (state) => {
      state.isLoading = "pending";
      state.items = [];
    });

    builder.addCase(fetchBillingAddress.fulfilled, (state, action) => {
      console.log("payload bill", action.payload);
      if (action?.payload?.length > 0) {
        console.log("succedded")
        state.isLoading = "succeeded";
        state.items = action?.payload;
        state.initialBillingAddressID = action?.payload[0]?.address_id;
      } else {
        console.log("failed")
        state.isLoading = "failed";
        state.items = [];
      }
      // window.location.reload();
    });

    builder.addCase(fetchBillingAddress.rejected, (state) => {
      state.isLoading = "failed";
      state.items = [];
      state.error = "Unable to load Addresses";
    });
  },
});

export const billing_address_state = (state: RootState) =>
  state.BillingAddressScreen;

export default BillingAddressScreen.reducer;
