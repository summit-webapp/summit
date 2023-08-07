import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeCustomerAddress from "../../../services/api/checkout-page-api/store-customer-address-api";
import { RootState } from "../../root-reducer";

export const storeCustomerAddresses: any = createAsyncThunk(
  "storeAddress/storeCustomerAddress",
  async (request: any) => {
    console.log("address req", request);
    const storeAddress = await storeCustomerAddress(request);
    return storeAddress;
  }
);

interface RepoStoreAddressState {
  data: any;
  error: any;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoStoreAddressState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const StoreAddressScreen = createSlice({
  name: "storeAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(storeCustomerAddresses.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
    });

    builder.addCase(storeCustomerAddresses.fulfilled, (state, action) => {
      console.log("address payload", action.payload);
      if (action?.payload?.length > 0) {
        if (action.payload?.customer_id?.hasOwnProperty("name")) {
          state.isLoading = "succeeded";
          localStorage.setItem("guestId", action?.payload?.customer_id?.name);
        } else {
          localStorage.setItem("guestId", action?.payload?.customer_id);
        }
      } else {
        state.isLoading = "failed";
        state.data = [];
      }
    });

    builder.addCase(storeCustomerAddresses.rejected, (state) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load Addresses";
    });
  },
});

export const store_address_state = (state: RootState) => {
  state.StoreAddressScreen;
};

export default StoreAddressScreen.reducer;
