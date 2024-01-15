import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUsFromSlice, fetch_AboutUs_selector_state } from '../../store/slices/general_slices/about-us-slice';

const useAboutUs = () => {
    const dispatch = useDispatch();
    const AboutUsReduxStoreData: any = useSelector(fetch_AboutUs_selector_state);
    console.log(AboutUsReduxStoreData,"aboutUs store")

    const [AboutUsData, setAboutUsData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<string>('');

    useEffect(() => {
        dispatch(fetchAboutUsFromSlice() as any);
    }, []);

    useEffect(() => {

        if (AboutUsReduxStoreData?.loading === 'pending') {
            setIsLoading(AboutUsReduxStoreData?.loading);
        } else if (
            AboutUsReduxStoreData?.loading === 'succeeded'
        ) {

            setAboutUsData(AboutUsReduxStoreData?.data)
            setIsLoading(AboutUsReduxStoreData?.loading);
        } else {
            setAboutUsData([]);
            setIsLoading(AboutUsReduxStoreData?.loading);
        }
    }, [AboutUsReduxStoreData]);

    return { AboutUsData, isLoading };
};
export default useAboutUs;
