import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAboutUsAPI from '../../../services/api/general_apis/about-us-api';

import { RootState } from '../../root-reducer';

export const fetchAboutUsFromSlice = createAsyncThunk('aboutUs', async () => {
  const getAboutUsAPIResponse: any = await fetchAboutUsAPI();
  console.log(' AboutUs data in slice', getAboutUsAPIResponse);
  return getAboutUsAPIResponse;
});

interface AboutUsState {
  AboutUsData: {};
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  err: string;
}

const initialState = {
  AboutUsData: {},
  loading: 'idle',
  err: '',
} as AboutUsState;

const AboutUsSlice = createSlice({
  name: 'AboutUsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchAboutUsFromSlice.pending, (state: any, action: any) => {
      console.log(' AboutUs data in slice pending');
      state.loading = 'pending';
      state.AboutUsData = {};
    });
    builder.addCase(fetchAboutUsFromSlice.fulfilled, (state: any, action: any) => {
      console.log(' AboutUs data in slice success', action);
      if (action.payload.status === 200 && action.payload.data.message.hasOwnProperty('data')) {
        state.loading = 'succeeded';
        state.data = action.payload.data.message.data;
      } else {
        state.loading = 'failed';
        state.AboutUsData = {};
      }
    });
    builder.addCase(fetchAboutUsFromSlice.rejected, (state: any, action: any) => {
      console.log(' AboutUs data in slice fail', action.payload);
      if (action.payload === 'Request timed out') {
        state.loading = 'failed';
        state.err = action.payload;
        state.AboutUsData = {};
      } else {
        state.loading = 'failed';
        state.err = 'Something went wrong';
        state.AboutUsData = {};
      }
    });
  },
});

export const fetch_AboutUs_selector_state = (state: RootState) => state.AboutUsScreen;

export default AboutUsSlice.reducer;
