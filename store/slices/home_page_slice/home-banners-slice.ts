import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getHomeBannersList from "../../../services/api/home_page_api/home-banners-api";
import { RootState } from "../../root-reducer";

export const fetchHomeBannerDataFromAPI = createAsyncThunk(
  "home-banner-slice/fetchHomeBannerDataStatus",
  async (TokenFromStore: any) => {
    const getHomeBannerAPIResponse: any = await getHomeBannersList(TokenFromStore);
    console.log("home banner data in slice", getHomeBannerAPIResponse);
    return getHomeBannerAPIResponse;
  }
);

interface HomeBannerButtonState {
  btn_title: string;
  btn_url: string;
}

interface IndividualHomeBannerDataState {
  id: string;
  img: string;
  seq: number;
  for_customer: number;
  btn_info: HomeBannerButtonState[];
}

interface HomeBannerState {
  homeBannerData: {
    msg?: string;
    data?: IndividualHomeBannerDataState[];
    err?: any;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
  err: string
}

const initialState = {
  homeBannerData: {},
  loading: "idle",
  err: ""
} as HomeBannerState;

const homeBannerSlice = createSlice({
  name: "home-banner-slice",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder: any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHomeBannerDataFromAPI.pending, (state: any, action: any) => {
      console.log("home banner data in slice pending");
      state.loading = "pending";
      state.homeBannerData = {};
    });
    builder.addCase(fetchHomeBannerDataFromAPI.fulfilled, (state: any, action: any) => {
      console.log("home banner data in slice success", action);
      if (
        action.payload.status === 200 &&
        action.payload.data.message.hasOwnProperty("data")
      ) {
        state.loading = "succeeded";
        state.homeBannerData = action.payload.data.message;
      } else {
        state.loading = "failed";
        state.homeBannerData = {};
      }
    });
    builder.addCase(fetchHomeBannerDataFromAPI.rejected, (state: any, action: any) => {
      console.log("home banner data in slice fail", action.payload);
      if (action.payload === "Request timed out") {
        state.loading = "failed";
        state.err = action.payload;
        state.homeBannerData = {};
      }
      else {
        state.loading = "failed";
        state.err = "Something went wrong";
        state.homeBannerData = {}
      }
    });
  },
});

export const home_banner_selector_state = (state: RootState) =>
  state.HomeBannerScreen;

export default homeBannerSlice.reducer;
