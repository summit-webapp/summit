import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import { fetchProductListingPageFilters } from "../../../services/api/product-listing-page-api/get-filters-api";
import { Filters } from "../../../interfaces/filters-slice-interface";
export const FiltersThunk = createAsyncThunk(
  "filters-slice/fetchFilters",
  async (request: any) => {
    console.log("filters product listing filters thunk router", request);
    const getFiltersOfProductListingPage = await fetchProductListingPageFilters(
      request
    );
    console.log(
      "filters check product listing filters in thunk",
      getFiltersOfProductListingPage
    );
    return getFiltersOfProductListingPage;
  }
);

const initialState = {
  msg: "",
  error: "",
  doctype: "",
  docname: "",
  filtersData: {},
  loading: "idle",
} as Filters;

const filtersSlice = createSlice({
  name: "filters-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FiltersThunk.pending, (state, action) => {
      state.loading = "pending";
      state.msg = "";
      state.error = "";
      state.doctype = "";
      state.docname = "";
      state.filtersData = [];
    });
    builder.addCase(FiltersThunk.fulfilled, (state, action) => {
      console.log("filters in fulfilled", action.payload);
      if (
        action.payload.status === 200 &&
        action.payload.data.message.msg !== "error"
      ) {
        const apiData = action.payload.data;
        state.loading = "succeeded";
        state.msg = apiData.message.msg;
        state.error = "";
        state.doctype = apiData.message.data.doctype;
        state.docname = apiData.message.data.docname;
        state.filtersData = apiData.message.data.filters;
      } else {
        state.loading = "succeeded";
        state.msg = "";
        state.error = "Error Fetching Data";
        state.doctype = "";
        state.docname = "";
        state.filtersData = [];
      }
    });
    builder.addCase(FiltersThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.msg = "";
      state.error = "Network Error";
      state.doctype = "";
      state.docname = "";
      state.filtersData = [];
    });
  },
});

export const filters_selector_state = (state: RootState) => state.FiltersScreen;

export default filtersSlice.reducer;
