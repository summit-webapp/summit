import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getDealerLedgerSummary from "../../../services/api/dealer-ledger-api/dealer-ledger-summary-api";

export const fetchDealerLedgerSummary: any = createAsyncThunk(
  "dealerLedgerSummary/fetchdealerSummary",
  async (token: any) => {
    const response = await getDealerLedgerSummary(token);
    return response;
  }
);

interface RepoDealerLedgerSummaryState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoDealerLedgerSummaryState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const DealerLedgerSummaryScreen = createSlice({
  name: "dealerLedgerSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDealerLedgerSummary.pending, (state) => {
      state.data = {};
      state.isLoading = "pending";
    });
    builder.addCase(fetchDealerLedgerSummary.fulfilled, (state, action) => {
      console.log("action payload dealer summry", action.payload);
      if (action?.payload?.data?.message?.msg === "success") {
        state.data = action.payload?.data?.message?.data;
        state.isLoading = "succeeded";
      }
    });
    builder.addCase(fetchDealerLedgerSummary.rejected, (state) => {
      state.data = [];
      state.isLoading = "failed";
      state.error = "Unable to load dealer ledger summary";
    });
  },
});

export const dealer_ledger_summary: any = (state: RootState) =>
  state.DealerledgerSummaryScreen;

export default DealerLedgerSummaryScreen.reducer;