import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getDealerLedger from "../../../services/api/dealer-ledger-api/dealer-ledger-api";

export const fetchDealerLedger: any = createAsyncThunk(
  "dealerLedger/fetchdealer",
  async (params: any) => {
    const response = await getDealerLedger(params);
    return response;
  }
);

interface RepoDealerLedgerState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoDealerLedgerState = {
  data: {},
  error: "",
  isLoading: "idle",
};

export const DealerLedgerScreen = createSlice({
  name: "dealerLedgerSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDealerLedger.pending, (state) => {
      state.data = [];
      state.isLoading = "pending";
    });
    builder.addCase(fetchDealerLedger.fulfilled, (state, action) => {
      console.log("action payload dealer data", action.payload);
      if (action?.payload?.data?.message?.msg === "success") {
        state.data = action?.payload?.data?.message?.data;
        state.isLoading = "succeeded";
      }
    });
    builder.addCase(fetchDealerLedger.rejected, (state) => {
      state.data = [];
      state.isLoading = "failed";
      state.error = "Unable to load dealer ledger summary";
    });
  },
});

export const dealerLedgerStore: any = (state: RootState) =>
  state.DealerledgerScreen;

export default DealerLedgerScreen.reducer;