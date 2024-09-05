import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MultiLangApi from '../../../services/api/general-apis/multilanguage-api';
import { RootState } from '../../root-reducer';

export const fetchMultiLanguagesThunkAPI: any = createAsyncThunk('multilanguage/fetchMultilanguage', async (params: any) => {
  const MultilanguageData = await MultiLangApi(params?.appConfig, params?.token);
  return MultilanguageData;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiLanguagesThunkAPI.pending, (state) => {
        state.isLoading = 'pending';
      })
      .addCase(fetchMultiLanguagesThunkAPI.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.languageData = action.payload; // Store the data here
        state.error = '';
      })
      .addCase(fetchMultiLanguagesThunkAPI.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setMultiLingualData } = MultiLanguageScreen.actions;

export const multiLanguageDataFromStore = (state: RootState) => state.MultilanguageScreen;

export default MultiLanguageScreen.reducer;
