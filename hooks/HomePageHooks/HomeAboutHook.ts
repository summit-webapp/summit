import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { fetchHomeAboutFromAPI, home_About_selector_state } from '../../store/slices/home_page_slice/home-about-slice';

const useHomeAbout = () => {
    const dispatch = useDispatch();
    const HomeAboutReduxStoreData: any = useSelector(home_About_selector_state);
    console.log(HomeAboutReduxStoreData,"about store")

    const [HomeAboutData, setHomeAboutData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<string>('');

    useEffect(() => {
        dispatch(fetchHomeAboutFromAPI() as any);
    }, []);

    useEffect(() => {

        if (HomeAboutReduxStoreData?.loading === 'pending') {
            setIsLoading(HomeAboutReduxStoreData?.loading);
        } else if (
            HomeAboutReduxStoreData?.loading === 'succeeded'
        ) {

            setHomeAboutData(HomeAboutReduxStoreData?.data)
            setIsLoading(HomeAboutReduxStoreData?.loading);
        } else {
            setHomeAboutData([]);
            setIsLoading(HomeAboutReduxStoreData?.loading);
        }
    }, [HomeAboutReduxStoreData]);

    return { HomeAboutData, isLoading };
};
export default useHomeAbout;
