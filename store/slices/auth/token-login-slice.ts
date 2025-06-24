import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import getTokenLoginApi from '../../../services/api/auth/get-token-from-login-api';

export const getAccessToken: any = createAsyncThunk('accessToken/getAccessToken', async (param: any) => {
  const AccessTokenData = await getTokenLoginApi(param);

  if (AccessTokenData?.data?.hasOwnProperty('access_token')) {
    localStorage.setItem('isLoggedIn', 'true');
  } else {
  }
  return AccessTokenData;
});
interface RepoAccessTokenState {
  token: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
  showSessionExpiredModal: boolean;
}

const initialState: RepoAccessTokenState = {
  token: '',
  error: '',
  isLoading: 'idle',
  showSessionExpiredModal: false,
};

export const GetAccessTokenScreen = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    storeToken(state: any, action: any) {
      state.token = action?.payload?.access_token;
      state.error = '';
      state.isLoading = 'succeeded';
      state.showSessionExpiredModal = false;
    },
    clearToken(state?: any, action?: any) {
      state.token = '';
      state.error = '';
      state.isLoading = 'idle';
      state.showSessionExpiredModal = false;
    },
    updateAccessToken(state?: any, action?: any) {
      state.token = action?.payload;
      state.error = '';
      state.isLoading = 'idle';
      state.showSessionExpiredModal = false;
    },
    setShowSessionExpiredModalTrue(state) {
      state.showSessionExpiredModal = true;
    },
    setShowSessionExpiredModalFalse(state) {
      state.showSessionExpiredModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.isLoading = 'pending';
      state.token = '';
      state.showSessionExpiredModal = false;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      if (action?.payload?.data?.hasOwnProperty('access_token')) {
        state.token = action?.payload?.data?.access_token;
        state.isLoading = 'succeeded';
        state.showSessionExpiredModal = false;
      }
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.token = '';
      state.error = 'failed to store token';
      state.showSessionExpiredModal = false;
    });
  },
});
export const get_access_token = (state: RootState) => state.GetAccessTokenScreen;
export const { storeToken, clearToken, updateAccessToken, setShowSessionExpiredModalTrue, setShowSessionExpiredModalFalse }: any = GetAccessTokenScreen.actions;

export default GetAccessTokenScreen.reducer;
