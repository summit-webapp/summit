import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

export type Option = {
  label: string;
  value: string | number;
}

interface selectedLang {
  selectedLanguage: string;
  error: string;
}

const initialState: selectedLang = {
  selectedLanguage: 'en',
  error: '',
};

type SelectedLangState = ReturnType<typeof SelectedLang.reducer>;

export const SelectedLang: any = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const SelectedLangFromStore = (state: RootState): SelectedLangState => state.SelectedLangDataReducer;
export const { setLanguage } = SelectedLang.actions;
export default SelectedLang.reducer;