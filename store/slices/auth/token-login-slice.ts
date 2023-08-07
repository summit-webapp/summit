import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getTokenLoginApi from "../../../services/api/auth/token-login-api";

export const getAccessToken: any = createAsyncThunk(
  "accessToken/getAccessToken",
  async (param: any) => {
    console.log("token param", param);
    const AccessTokenData = await getTokenLoginApi(param);
    console.log(AccessTokenData, "AccessTokenData");

    return AccessTokenData;
  }
);
interface RepoAccessTokenState {
  token: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoAccessTokenState = {
  token: "",
  error: "",
  isLoading: "idle",
};

export const GetAccessTokenScreen = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    ClearToken(state?: any, action?: any) {
      state.token = "";
      state.error = "";
      state.isLoading = "idle";
    },
    updateAccessToken(state?: any, action?: any) {
      console.log("new access token payload", action.payload);
      state.token = action?.payload;
      state.error = "";
      state.isLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.isLoading = "pending";
      state.token = "";
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      console.log("token payload", action.payload);
      state.isLoading = "succeeded";
      state.token = action?.payload?.access_token;
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.isLoading = "failed";
      state.token = "";
      state.error = "failed to store token";
    });
    // builder.addCase(updateAccessToken.fulfilled, (state, action) => {
    //   console.log("new access token payload", action.payload);
    //   state.token = action?.payload?.access_token;
    // });
  },
});

export const get_access_token = (state: RootState) =>
  state.GetAccessTokenScreen;
export const { ClearToken, updateAccessToken }: any =
  GetAccessTokenScreen.actions;

export default GetAccessTokenScreen.reducer;
