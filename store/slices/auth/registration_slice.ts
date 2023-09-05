import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import RegistrationApi from "../../../services/api/auth/registration_api";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../general_slices/toast_notification_slice";
import { showToast } from "../../../components/ToastNotificationNew";

export const getRegistrationData: any = createAsyncThunk(
  "registrationData/getRegistrationData",
  async (data, { dispatch }) => {
    const RegistrationValues = await RegistrationApi(data);
    console.log(RegistrationValues, "RegistrationValues");
    if (
      RegistrationValues.status === 200 &&
      RegistrationValues?.data?.message?.msg === "success"
    ) {
      showToast("Registerd sucessfully", "success");
    } else {
      showToast(RegistrationValues?.data?.message?.error, "error");
    }
    return RegistrationValues;
  }
);
interface RepoRegistrationState {
  items: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoRegistrationState = {
  items: {},
  error: "",
  isLoading: "idle",
};

export const RepoRegistrationScreen = createSlice({
  name: "registrationData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRegistrationData.pending, (state) => {
      state.isLoading = "pending";
      state.items = {};
    });
    builder.addCase(getRegistrationData.fulfilled, (state, action) => {
      state.isLoading = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(getRegistrationData.rejected, (state, action) => {
      state.isLoading = "failed";
      state.items = {};
      state.error = "Unable to load brands";
    });
  },
});

export const registration_state = (state: RootState) =>
  state.RepoRegistrationScreen;

export default RepoRegistrationScreen.reducer;
