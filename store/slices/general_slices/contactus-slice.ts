import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetContactUsAPI } from '../../../services/api/general_apis/contactus-api';
import { RootState } from '../../root-reducer';

export const GetContactUs = createAsyncThunk('ContactUs', async () => {
  const getContactUsData = await GetContactUsAPI();
  console.log('Contact us', getContactUsData);
  return getContactUsData;
});

interface ContactUsData {
  data: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  data: [],
  error: '',
  isLoading: 'idle',
} as ContactUsData;

const ContactUsSlice = createSlice({
  name: 'ContactUsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetContactUs.pending, (state, action) => {
      state.data = {};
      state.isLoading = 'pending';
    });
    builder.addCase(GetContactUs.fulfilled, (state, action) => {
      // console.log('serial list payload', action?.payload?.data);
      state.isLoading = 'succeeded';
      state.data = action?.payload?.data?.message?.data;
    });
    builder.addCase(GetContactUs.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.data = [];
    });
  },
});

export const contact_us_from_store = (state: RootState) => state.ContactUsSlice;

export default ContactUsSlice.reducer;
