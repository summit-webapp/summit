import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import { CONSTANTS } from "../../../services/config/app-config";
import {language_abbr} from "../../../languages/language_abbr";

const set_selected_language = () => {

  const initialState = {
    language: language_abbr[CONSTANTS.DEFAULT_LANGUAGE] || "en",
  };
  
  return initialState;
};

const initialState = set_selected_language();

const SelectedLanguage = createSlice({
  name: "selected-language",
  initialState,
  reducers: {
    changeSelectedLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const selected_lang_selector_state = (state: RootState) =>
  state.SelectedLanguageScreen;

export default SelectedLanguage.reducer