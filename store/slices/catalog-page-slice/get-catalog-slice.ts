import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getOrderSummary from "../../../services/api/checkout-page-api/order-summary";
import GetCatalogList from "../../../services/api/product-catalog-api/get-catalog-list-api";

export const fetchCatalogList: any = createAsyncThunk(
  "orderSummary/fetchOrderSummary",
  async (token:any) => {
    const catalogList = await GetCatalogList(token);
    console.log("order summary in slice",catalogList );
    return catalogList ;
  }
);

interface RepoFetchCatalogListState {
  data: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState:  RepoFetchCatalogListState = {
  data: [],
  error: "",
  isLoading: "idle",
};

export const CatalogListScreen = createSlice({
  name: "catalogListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogList.pending, (state) => {
      state.isLoading = "pending";
      state.data = [];
    });

    builder.addCase(fetchCatalogList.fulfilled, (state, action) => {
        console.log(action?.payload,"data")
      if(action?.payload?.message?.msg ==='success') {
        state.isLoading = "succeeded";
        state.data = action?.payload.message?.data;
    }else {
        state.isLoading = "succeeded"
        state.data = [];
        state.error = "";
    }
    });

    builder.addCase(fetchCatalogList.rejected, (state) => {
      state.isLoading = "failed";
      state.data = [];
      state.error = "Unable to load order summary";
    });
  },
});

export const catalog_summary_state = (state: RootState) =>
  state.CatalogListScreen;

export default CatalogListScreen.reducer;