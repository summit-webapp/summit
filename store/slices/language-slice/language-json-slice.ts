import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
export const MultiLingualSlice = createAsyncThunk('multi-lingual-slice/fetchMultilingual', async (params: any) => {
  const translationData = await import(`../../../languages/${params}.json`);
  return translationData.default;
});

const initialState = {
  data: {},
};

const languageSlice = createSlice({
  name: 'multi-lingual-slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MultiLingualSlice.pending, (state, action) => {
      state.data = {};
    });
    builder.addCase(MultiLingualSlice.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(MultiLingualSlice.rejected, (state, action) => {
      state.data = {};
    });
  },
});

export const language_json_data_state = (state: RootState) => state.LanguagesScreen.data;

export default languageSlice.reducer;
