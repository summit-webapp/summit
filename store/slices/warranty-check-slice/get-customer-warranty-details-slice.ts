import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WarrantyGetClaimAPI } from '../../../services/api/warranty-check-api/get-warranty-claim';
import { RootState } from '../../root-reducer';
import { GetCustomerWarrantyDetailsAPI } from '../../../services/api/warranty-check-api/get-customer-warranty-details';

export const GetCustomerWarrantyDetails = createAsyncThunk(
    'fetchGetCustomerWarrantyDetails',
    async (customer: any) => {
        console.log("serial detailll")
        const CustomerWarrantyData = await GetCustomerWarrantyDetailsAPI(
            customer,
        );
        console.log('warranty', CustomerWarrantyData);
        return CustomerWarrantyData;
    }
);

interface CustomerWarrantyData {
    data: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    data: [],
    error: '',
    isLoading: "idle"
} as CustomerWarrantyData;

const GetCustomerWarrantyDetailsSlice = createSlice({
    name: 'GetCustomerWarrantyDetailsSlice',
    initialState,
    reducers: {
        ClearWarrantyCustomer(state?: any, action?: any) {
            console.log("clear serial warranty")
            state.data = [];
            state.error = '';
            state.isLoading = "idle";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetCustomerWarrantyDetails.pending, (state, action) => {
            state.data = {};
            state.isLoading = 'pending';
        });
        builder.addCase(GetCustomerWarrantyDetails.fulfilled, (state, action) => {
            console.log('serial detail payload', action.payload.data);
            state.isLoading = 'succeeded';
            state.data = action?.payload?.data?.message?.data
        });
        builder.addCase(GetCustomerWarrantyDetails.rejected, (state, action) => {
            state.isLoading = 'failed'
            state.data = [];
        });
    },
});

export const warranty_customer_details_from_store = (state: RootState) =>
    state.GetCustomerWarrantyDetailsSlice;
export const { ClearWarrantyCustomer } :any = GetCustomerWarrantyDetailsSlice.actions

export default GetCustomerWarrantyDetailsSlice.reducer;
