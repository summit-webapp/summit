import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import getTopBrandAPI from '../../services/api/home-page-apis/get-top-brand-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const useTopBrand = () => {
  const [brandListing, setBrandListing] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const fetchTopBrandData = async () => {
    let getTopBrandData: any;
    setIsLoading(true);
    try {
      getTopBrandData = await getTopBrandAPI(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      if (getTopBrandData?.status === 200 && getTopBrandData?.data?.msg === 'success') {
        setBrandListing(getTopBrandData?.data?.data);
      } else {
        setErrMessage('No Data Found');
      }
    } catch (error) {
      setErrMessage('No Data Found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopBrandData();
  }, []);
  return { isLoading, brandListing, errorMessage };
};

export default useTopBrand;
