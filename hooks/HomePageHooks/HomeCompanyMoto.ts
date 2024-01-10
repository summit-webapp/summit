import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { company_moto_from_store, fetchCompanyMoto } from '../../store/slices/home_page_slice/home-company-moto-slice';
const useCompanyMoto = () => {
    let [companyMoto, setCompanyMoto] = useState<any>([]);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const companyMotoData: any = useSelector(company_moto_from_store);
    useEffect(() => {
        dispatch(fetchCompanyMoto());
        setLoading(true);
    }, []);
    console.log('companymoto', companyMoto);
    useEffect(() => {
        setCompanyMoto(companyMotoData?.items?.data?.message?.data);
    }, [companyMotoData]);
    console.log('companyMotoData', companyMotoData);
    return {
        companyMotoData,
        loading,
    };
};
export default useCompanyMoto;
