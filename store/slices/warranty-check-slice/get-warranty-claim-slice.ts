import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WarrantyGetClaimAPI } from '../../../services/api/warranty-check-api/get-warranty-claim';
import { RootState } from '../../root-reducer';

export const WarrantyGetClaim = createAsyncThunk('fetchWarrantyGetClaim', async (serial_no: any) => {
  const getWarrantyGetClaim = await WarrantyGetClaimAPI(serial_no);
  console.log('serial', getWarrantyGetClaim);
  return getWarrantyGetClaim;
});

interface WarrantyGetClaimData {
  data: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  data: [],
  error: '',
  isLoading: 'idle',
} as WarrantyGetClaimData;

const WarrantyGetClaimSlice = createSlice({
  name: 'WarrantyGetClaimSlice',
  initialState,
  reducers: {
    ClearWarrantyClaim(state?: any, action?: any) {
      console.log('clear serial warranty');
      state.data = [];
      state.error = '';
      state.isLoading = 'idle';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(WarrantyGetClaim.pending, (state, action) => {
      state.data = {};
      state.isLoading = 'pending';
    });
    builder.addCase(WarrantyGetClaim.fulfilled, (state, action) => {
      console.log('serial detail payload', action.payload.data);
      state.isLoading = 'succeeded';
      state.data = action?.payload?.data?.message?.data;
    });
    builder.addCase(WarrantyGetClaim.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.data = [];
    });
  },
});

export const warranty_get_claim_from_store = (state: RootState) => state.WarrantyGetClaimSlice;
export const { ClearWarrantyClaim }: any = WarrantyGetClaimSlice.actions;

export default WarrantyGetClaimSlice.reducer;
