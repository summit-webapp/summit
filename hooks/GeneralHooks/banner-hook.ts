import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { banner_from_store, fetchBanner } from '../../store/slices/general_slices/banner-slice';
import { fetchCatalogList } from '../../store/slices/catalog-page-slice/get-catalog-slice';

const useBanner = () => {
    let [banner, setBanner] = useState<any>([]);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { query } = useRouter()
    // console.log("@123", query)
    const bannerData: any = useSelector(banner_from_store);

    useEffect(() => {
        dispatch(fetchBanner(query?.category));
        setLoading(true);
    }, []);

    console.log('banner', banner);
    useEffect(() => {
        setBanner(bannerData?.items?.data?.message?.data);
    }, [bannerData]);

    console.log('bannerdata', bannerData);

    return {
        bannerData,
        loading,
    };
};

export default useBanner;
