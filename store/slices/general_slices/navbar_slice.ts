import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getNavbarList from "../../../services/api/general_apis/navbar-api";
import { RootState } from "../../root-reducer";

// First, create the thunk
export const fetchNavbarDataFromAPI = createAsyncThunk(
  "navbar-slice/fetchNavbarDataStatus",
  async (token: any) => {
    const getNavbarAPIResponse: any = await getNavbarList(token);
    console.log("navbar data in slice", getNavbarAPIResponse);
    return getNavbarAPIResponse;
  }
);

interface NavbarDataState {
  values: any;
  name: string;
  seq: number;
  slug: string;
  image: string
}

interface NavbarState {
  navbarData: {
    msg?: string;
    data?: NavbarDataState[];
    err?: any
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  navbarData: {},
  loading: "idle",
} as NavbarState;

// Then, handle actions in your reducers:
const navbarSlice = createSlice({
  name: "navbar-slice",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchNavbarDataFromAPI.pending, (state, action) => {
      console.log("navbar data in slice pending");
      state.loading = "pending";
      state.navbarData = {};
    });
    builder.addCase(fetchNavbarDataFromAPI.fulfilled, (state, action) => {
      console.log("navbar data in slice success", action);
      if (
        action.payload.status === 200 &&
        action.payload.data.message.hasOwnProperty("data")
      ) {
        state.loading = "succeeded";
        state.navbarData = action.payload.data.message;
      }
      else {
        state.loading = "failed";
        state.navbarData = {};
      }
    });
    builder.addCase(fetchNavbarDataFromAPI.rejected, (state, action) => {
      console.log("navbar data in slice fail");
      state.loading = "failed";
    });
  },
});

export const navbar_selector_state = (state: RootState) => state.NavbarScreen;

export default navbarSlice.reducer;
