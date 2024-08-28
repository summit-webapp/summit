import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MultiLangApi from '../../../services/api/general-apis/multilanguage-api';
import { RootState } from '../../root-reducer';
import APP_CONFIG from '../../../interfaces/app-config-interface';

export const fetchMultiLanguagesThunkAPI: any = createAsyncThunk(
  'multilanguage/fetchMultilanguage',
  async (appConfig: APP_CONFIG, token: any) => {
    const MultilanguageData = await MultiLangApi(appConfig, token);
    return MultilanguageData;
  }
);

interface RepoDisplayTag {
  languageData: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoDisplayTag = {
  languageData: [],
  error: '',
  isLoading: 'idle',
};

export const MultiLanguageScreen = createSlice({
  name: 'multilanguage',
  initialState,
  reducers: {
    setMultiLingualData(state, action) {
      state.isLoading = 'succeeded';
      state.languageData = [...action.payload];
      state.error = '';
    },
  },
});

export const { setMultiLingualData } = MultiLanguageScreen.actions;

export const multiLanguageDataFromStore = (state: RootState) => state.MultilanguageScreen;

export default MultiLanguageScreen.reducer;
