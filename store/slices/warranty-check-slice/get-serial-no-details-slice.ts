import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWarrantySerialNoDetails } from '../../../services/api/warranty-check-api/get-serial-no-details-api';
import { RootState } from '../../root-reducer';

export const WarrantySerailNoDetails = createAsyncThunk(
    'fetchWarrantySerialNoDetails',
    async (serial_no: any) => {

        const getSerialDetailsData = await fetchWarrantySerialNoDetails(
            serial_no,
        );
        console.log('serial', getSerialDetailsData);
        return getSerialDetailsData;
    }
);

interface WarrantySerialDetailsData {
    data: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    data: [],
    error: '',
    isLoading: "idle"
} as WarrantySerialDetailsData;

const WarrantySerailNoDetailsSlice = createSlice({
    name: 'WarrantySerailNoDetailsSlice',
    initialState,
    reducers: {
        ClearWarrantyDetails(state?: any, action?: any) {
            console.log("clear serial warranty")
            state.data = [];
            state.error = '';
            state.isLoading = "idle";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(WarrantySerailNoDetails.pending, (state, action) => {
            state.data = {};
            state.isLoading = 'pending';
        });
        builder.addCase(WarrantySerailNoDetails.fulfilled, (state, action) => {
            console.log('serial detail payload', action.payload.data);
            state.isLoading = 'succeeded';
            state.data = action?.payload?.data?.message?.data
        });
        builder.addCase(WarrantySerailNoDetails.rejected, (state, action) => {
            state.isLoading = 'failed'
            state.data = [];
        });
    },
});

export const warranty_serial_details_from_store = (state: RootState) =>
    state.WarrantySerailNoDetailsSlice;
export const { ClearWarrantyDetails }: any = WarrantySerailNoDetailsSlice.actions;


export default WarrantySerailNoDetailsSlice.reducer;
