import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchHomeAboutData from '../../../services/api/home_page_api/home-about-api';
import { RootState } from '../../root-reducer';

export const fetchHomeAboutFromAPI = createAsyncThunk(
    'home-about',
    async () => {
        const getHomeAboutAPIResponse: any =
            await fetchHomeAboutData();
        console.log('home About data in slice', getHomeAboutAPIResponse);
        return getHomeAboutAPIResponse;
    }
);



interface HomeAboutState {
    homeAboutData: {};
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    err: string;
}

const initialState = {
    homeAboutData: {},
    loading: 'idle',
    err: '',
} as HomeAboutState;

const homeAboutSlice = createSlice({
    name: 'home-About-slice',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {

        builder.addCase(
            fetchHomeAboutFromAPI.pending,
            (state: any, action: any) => {
                console.log('home About data in slice pending');
                state.loading = 'pending';
                state.homeAboutData = {};
            }
        );
        builder.addCase(
            fetchHomeAboutFromAPI.fulfilled,
            (state: any, action: any) => {
                console.log('home About data in slice success', action);
                if (
                    action.payload.status === 200 &&
                    action.payload.data.message.hasOwnProperty('data')
                ) {
                    state.loading = 'succeeded';
                    state.data = action.payload.data.message.data;
                } else {
                    state.loading = 'failed';
                    state.homeAboutData = {};
                }
            }
        );
        builder.addCase(
            fetchHomeAboutFromAPI.rejected,
            (state: any, action: any) => {
                console.log('home About data in slice fail', action.payload);
                if (action.payload === 'Request timed out') {
                    state.loading = 'failed';
                    state.err = action.payload;
                    state.homeAboutData = {};
                } else {
                    state.loading = 'failed';
                    state.err = 'Something went wrong';
                    state.homeAboutData = {};
                }
            }
        );
    },
});

export const home_About_selector_state = (state: RootState) =>
    state.HomeAboutScreen;

export default homeAboutSlice.reducer;
