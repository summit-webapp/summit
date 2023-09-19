import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";

interface selectedLangData {
  selectedLanguageData: any;
  selectHtmlLayoutDir: any;
  error: string;
}

const initialState: selectedLangData = {
  selectedLanguageData: [],
  selectHtmlLayoutDir: "ltr",
  error: "",
};

export const SelectedFilterLangData: any = createSlice({
  name: "selectedLang",
  initialState,
  reducers: {
    SelectedLangData: (state, action) => {
      // console.log(action.payload, "payload toast");
      if (action?.payload?.multilanguageData?.length > 0) {
        const filteredList = action?.payload?.multilanguageData?.filter(
          (obj: any) => obj?.lang_code === action?.payload?.selectedLanguage
        );

        if (filteredList?.length > 0 && filteredList !== null) {
          // console.log("filteredList", filteredList);
          state.selectedLanguageData = filteredList[0]?.value;
        }
      }
    },
    SelectHtmlLayoutDir: (state, action) => {
      console.log("dir action payload", action.payload);
      state.selectHtmlLayoutDir = action.payload;
    },
  },
});

export const SelectedFilterLangDataFromStore = (state: RootState) =>
  state.SelectedFilterLangDataScreen;

export const { SelectedLangData, SelectHtmlLayoutDir } =
  SelectedFilterLangData.actions;
export default SelectedFilterLangData.reducer;
