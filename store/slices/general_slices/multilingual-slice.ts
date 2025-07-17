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

export const SelectedLang: any = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const SelectedLangFromStore = (state: RootState) => state.SelectedLangDataReducer;
export const { setLanguage } = SelectedLang.actions;
export default SelectedLang.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface selectedLang {
  selectedLanguage: string;
  error: string;
}

const initialState: selectedLang = {
  selectedLanguage: 'en',
  error: '',
};

export const SelectedLang: any = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const SelectedLangFromStore = (state: RootState) => state.SelectedLangDataReducer;
export const { setLanguage } = SelectedLang.actions;
export default SelectedLang.reducer;
