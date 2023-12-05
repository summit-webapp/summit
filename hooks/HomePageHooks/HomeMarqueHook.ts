import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeMarque, home_marque_from_store } from '../../store/slices/home_page_slice/home-marque-slice';
const useHomeMarque = () => {
    let [marque, setMarque] = useState<any>([]);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const homeMarque: any = useSelector(home_marque_from_store);
    useEffect(() => {
        dispatch(fetchHomeMarque());
        setLoading(true);
    }, []);
    console.log('marque', marque);
    useEffect(() => {
        setMarque(homeMarque?.items?.data?.message?.data);
    }, [homeMarque]);
    console.log('homeMarque', homeMarque);
    return {
        homeMarque,
        loading,
    };
};
export default useHomeMarque;
