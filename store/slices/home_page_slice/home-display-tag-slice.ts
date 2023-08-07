import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import displayTagList from "../../../services/api/home_page_api/home-display-tag-api";
import { RootState } from "../../root-reducer";

export const fetchDisplayTags: any = createAsyncThunk(
  "displayTagsList/fetchDisplayTags",
  async (token: any) => {
    const displayTags = await displayTagList(token);
    console.log("display tags slice", displayTags);
    return displayTags;
  }
);
interface RepoDisplayTag {
  tagData: any
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoDisplayTag = {
  tagData: [],
  error: "",
  isLoading: "idle",
};

export const displayTagScreen = createSlice({
  name: "displayTagsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDisplayTags.pending, (state) => {
      state.isLoading = "pending";
      state.error = "";
      state.tagData = []
    });
    builder.addCase(fetchDisplayTags.fulfilled, (state, action) => {
      console.log("display tag in slice fulfilled", action.payload)
      state.isLoading = "succeeded";
      state.error = "";
      state.tagData = action.payload;
    });
    builder.addCase(fetchDisplayTags.rejected, (state, action) => {
      state.isLoading = "failed";
      state.error = "Network Error";
      state.tagData = []
    });
  },
});

export const display_tags = (state: RootState) => state.HomeDisplayTagScreen;

export default displayTagScreen.reducer;
