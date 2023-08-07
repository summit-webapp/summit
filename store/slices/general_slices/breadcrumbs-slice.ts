import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBreadCrumbs from "../../../services/api/general_apis/breadcrumbs-api";
import { RootState } from "../../root-reducer";

export const fetchBreadCrumbs: any = createAsyncThunk(
  "breadcrumbs/fetchbreadcrumbs",
  async (request) => {
    const breadCrumbsData = await getBreadCrumbs(request);
    console.log("breadcrumb resss", breadCrumbsData);
    return breadCrumbsData;
  }
);

interface RepoBreadCrumbsState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoBreadCrumbsState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const BreadCrumbsScreen = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBreadCrumbs.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
      state.error = "";
    });

    builder.addCase(fetchBreadCrumbs.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.msg === "success"
      ) {
        state.isLoading = "succeeded";
        state.data = action?.payload?.data?.message?.data;
        state.error = "";
      } else {
        state.isLoading = "succeeded";
        state.data = [];
        state.error = "";
      }
    });

    builder.addCase(fetchBreadCrumbs.rejected, (state) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load Bread crumbs";
    });
  },
});

export const breadcrumbs_state = (state: RootState) => state.BreadCrumbsScreen;

export default BreadCrumbsScreen.reducer;
