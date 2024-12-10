import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface selectedLangData {
  selectedLanguageData: any;
  error: string;
}

const initialState: selectedLangData = {
  selectedLanguageData: [],
  error: '',
};

export const SelectedFilterLangData: any = createSlice({
  name: 'selectedLang',
  initialState,
  reducers: {
    SelectedLangData: (state, action) => {
      if (action?.payload?.multilanguageData?.length > 0) {
        const filteredList = action?.payload?.multilanguageData?.filter((obj: any) => obj?.lang_code === action?.payload?.selectedLanguage);
        if (filteredList?.length > 0 && filteredList !== null) {
          state.selectedLanguageData = filteredList[0]?.value;
        }
      }
    },
  },
});

export const SelectedFilterLangDataFromStore = (state: RootState) => state.SelectedFilterLangDataReducer;

export const { SelectedLangData } = SelectedFilterLangData.actions;
export default SelectedFilterLangData.reducer;
