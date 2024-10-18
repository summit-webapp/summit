import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
import getTopCategoryAPI from '../../services/api/home-page-apis/top-categories-api';

const useHomeTopCategories = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const tokenFromStore: any = useSelector(get_access_token);
  const [selectedCurrencyVal, setSelectedVal] = useState();
  const [homeTopCategories, setHomeTopCategories] = useState<any>([]);

  useEffect(() => {
    setSelectedVal(currency_state_from_redux?.selected_currency_value);
  }, [currency_state_from_redux]);
  const fetchTopCategoriesData = async () => {
    let getCategoryData: any;
    setIsLoading(true);
    try {
      getCategoryData = await getTopCategoryAPI(SUMMIT_APP_CONFIG, tokenFromStore?.token);
      if (getCategoryData?.status === 200 && getCategoryData?.data?.msg === 'success') {
        setHomeTopCategories(getCategoryData?.data?.data);
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
    fetchTopCategoriesData();
  }, []);
  return { homeTopCategories, isLoading, errorMessage };
};

export default useHomeTopCategories;
