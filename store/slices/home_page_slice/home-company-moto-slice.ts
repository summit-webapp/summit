import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCompanyMotoAPI } from '../../../services/api/home_page_api/home-company-moto-api';
import { RootState } from '../../root-reducer';

export const fetchCompanyMoto: any = createAsyncThunk(
    'fetchCompanyMoto',
    async () => {
        const CompanyMotoData = await fetchCompanyMotoAPI();
        console.log("companyMoto", CompanyMotoData);
        return CompanyMotoData;
    }
);
interface RepoCompanyMoto {
    data: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoCompanyMoto = {
    data: [],
    error: '',
    isLoading: 'idle',
};

export const CompanyMoto = createSlice({
    name: 'CompanyMoto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCompanyMoto.pending, (state) => {
            state.isLoading = 'pending';
            state.error = '';
        });
        builder.addCase(fetchCompanyMoto.fulfilled, (state, action) => {
            {
                if (
                    action?.payload?.status === 200 &&
                    action?.payload?.data?.hasOwnProperty('message')
                ) {
                    state.isLoading = 'succeeded';
                    state.data = action.payload.data.message.data;
                } else {
                    state.isLoading = 'succeeded';
                    state.error = '';
                    state.data = [];
                }
            }
        });

        builder.addCase(fetchCompanyMoto.rejected, (state) => {
            state.isLoading = 'failed';
            state.data = [];
            state.error = 'Unable to load marque';
        });
    },
});


export const company_moto_from_store = (state: RootState) => state.CompanyMoto;

export default CompanyMoto.reducer;
