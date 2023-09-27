import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import { ProfileDataFetch } from '../../../services/api/general_apis/ProfilePageApi/profile-page-api';

export const fetchprofileDataThunk: any = createAsyncThunk(
  'profileData/fetchprofileDataThunk',
  async (token: any) => {
    const ProfileOrderData = await ProfileDataFetch(token);
    console.log(ProfileOrderData, ' brandData');
    return ProfileOrderData;
  }
);
interface RepofetchProfileDataState {
  partyName: any;
  items: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepofetchProfileDataState = {
  partyName: '',
  items: [],
  error: '',
  isLoading: 'idle',
};

export const ProfileDataScreen = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    ClearPartyName(state?: any, action?: any) {
      state.partyName = '';
      state.error = '';
      state.isLoading = 'idle';
    },
    UpdatePartyName(state?: any, action?: any) {
      console.log('update partyName');
      console.log('update partyName', action?.payload);
      state.partyName = action?.payload;
      state.error = '';
      state.isLoading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchprofileDataThunk.pending, (state) => {
      state.isLoading = 'pending';
      state.partyName = '';
      state.items = [];
    });
    builder.addCase(fetchprofileDataThunk.fulfilled, (state, action) => {
      console.log(
        action?.payload?.data?.message?.data?.profile_details?.customer_name,
        'datass'
      );
      if (action?.payload?.status === 200) {
        state.isLoading = 'succeeded';
        state.partyName =
          action?.payload?.data?.message?.data?.profile_details?.customer_name;
        state.items = action?.payload;
      } else {
        state.isLoading = 'failed';
        state.partyName = '';
        state.items = [];
        state.error = 'Profile data is not loaded';
      }
    });
    builder.addCase(fetchprofileDataThunk.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.partyName = '';
      state.items = [];
      state.error = 'data is not found';
    });
  },
});

export const profileData_state = (state: RootState) => state.ProfileDataScreen;
export const { UpdatePartyName, ClearPartyName }: any =
  ProfileDataScreen.actions;

export default ProfileDataScreen.reducer;
