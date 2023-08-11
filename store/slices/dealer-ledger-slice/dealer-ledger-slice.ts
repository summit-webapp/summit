import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getDealerLedgerSummary from "../../../services/api/dealer-ledger-api/dealer-ledger-summary-api";

export const fetchDealerLedger: any = createAsyncThunk(
  "dealerLedger/fetchdealer",
  async (token: any) => {
    const response = await getDealerLedgerSummary(token);
    return response;
  }
);

interface RepoDealerLedgerState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoDealerLedgerState = {
  data: [],
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
      console.log("action payload dealer summry", action.payload);
      state.data = action.payload;
      state.isLoading = "succeeded";
    });
    builder.addCase(fetchDealerLedger.rejected, (state) => {
      state.data = [];
      state.isLoading = "failed";
      state.error = "Unable to load dealer ledger summary";
    });
  },
});

export const dealerLedgerSummary: any = (state: RootState) =>
  state.DealerledgerScreen;

export default DealerLedgerScreen.reducer;
