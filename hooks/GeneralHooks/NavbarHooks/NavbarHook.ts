import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getNavbarDataFromAPI from '../../../services/api/general_apis/navbar-api';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { fetchCartListing } from '../../../store/slices/cart-listing-page-slice/cart-listing-slice';
import { currency_selector_state } from '../../../store/slices/general_slices/multi-currency-slice';
import useHandleStateUpdate from '../handle-state-update-hook';
const useNavbar = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const dispatch = useDispatch();

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [navbarData, setNavbarData] = useState<any>(null);

  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState('');

  const fetchNavbarDataAPI = async () => {
    setIsLoading(true);
    try {
      const navbarDataAPI: any = await getNavbarDataFromAPI(TokenFromStore?.token);
      if (navbarDataAPI?.data?.message?.msg === 'success' && navbarDataAPI?.data?.message?.data?.length) {
        // BELOW CODE IS TO SORT NAVBAR DATA AND STORE IN THE STATE
        setNavbarData(
          [...navbarDataAPI?.data?.message?.data].sort(function (a: any, b: any) {
            return a.seq - b.seq;
          })
        );
      } else {
        setNavbarData([]);
        setErrMessage(navbarDataAPI?.data?.message?.data?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
    dispatch(fetchCartListing(TokenFromStore?.token));
  };
  useEffect(() => {
    fetchNavbarDataAPI();
  }, []);

  useEffect(() => {
    setSelectedCurrencyValue(currency_state_from_redux?.selected_currency_value);
  }, [currency_state_from_redux?.selected_currency_value]);
  return {
    navbarData,
    isLoading,
    errorMessage,
    selectedCurrencyValue,
  };
};

export default useNavbar;
