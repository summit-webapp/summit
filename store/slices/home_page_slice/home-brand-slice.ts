import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBrandsList from "../../../services/api/home_page_api/home-brand-api";
import { RootState } from "../../root-reducer";


export const fetchBrands: any = createAsyncThunk(
  "brands/fetchBrands",
  async (token: any) => {
    const brandData = await getBrandsList(token);
    console.log(brandData, " brandData")
    return brandData;

  }

);
interface RepoBrandsState {
  items: any,
  error: string,
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoBrandsState = {
  items: [],
  error: '',
  isLoading: "idle"
}


export const BrandsScreen = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.isLoading = "pending"
      state.items = []
    })
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.isLoading = "succeeded"
      state.items = action.payload
    })
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.isLoading = "failed";
      state.items = []
      state.error = "Unable to load brands"
    })
  },
})

export const brand_state = (state: RootState) => state.HomeTopBrandScreen;


export default BrandsScreen.reducer;

