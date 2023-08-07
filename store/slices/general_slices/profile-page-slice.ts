import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBrandsList from "../../../services/api/home_page_api/home-brand-api";
import { RootState } from "../../root-reducer";
import getQuickOrder from "../../../services/api/general_apis/quick-order-api";
import { ProfileDataFetch } from "../../../services/api/general_apis/ProfilePageApi/profile-page-api";


export const fetchprofileDataThunk: any = createAsyncThunk(
  "profileData/fetchprofileDataThunk",
  async (token: any) => {
    const ProfileOrderData = await ProfileDataFetch(token);
    console.log(ProfileOrderData, " brandData")
    return ProfileOrderData;

  }

);
interface RepofetchProfileDataState {
  items: any,
  error: string,
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepofetchProfileDataState = {
  items: [],
  error: '',
  isLoading: "idle"
}


export const ProfileDataScreen = createSlice({
  name: 'profileData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchprofileDataThunk.pending, (state) => {
      state.isLoading = "pending"
      state.items = []
    })
    builder.addCase(fetchprofileDataThunk.fulfilled, (state, action) => {
      console.log(action.payload, "datass")
      if (action?.payload?.status === 200) {
        state.isLoading = "succeeded"
        state.items = action?.payload
      }
      else {
        state.isLoading = "failed"
        state.items = []
        state.error = "Profile data is not loaded"
      }

    })
    builder.addCase(fetchprofileDataThunk.rejected, (state, action) => {
      state.isLoading = "failed";
      state.items = []
      state.error = "data is not found"
    })
  },
})

export const profileData_state = (state: RootState) => state.ProfileDataScreen;


export default ProfileDataScreen.reducer;