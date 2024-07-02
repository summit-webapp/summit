import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getNavbarList from '../../../services/api/general_apis/navbar-api';
import { get_access_token } from '../../../store/slices/auth/token-login-slice';
import { fetchCartListing } from '../../../store/slices/cart-listing-page-slice/cart-listing-slice';
import {
  currency_selector_state,
  setCurrencyValue
} from '../../../store/slices/general_slices/multi-currency-slice';
import {
  navbar_selector_state
} from '../../../store/slices/general_slices/navbar_slice';
const useNavbar = () => {
  const dispatch = useDispatch();

  const { query, push }: any = useRouter();
  const navbarReduxStoreData: any = useSelector(navbar_selector_state);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [navbarData, setNavbarData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<string>('');

  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState('');
  console.log(getNavbarList, navbarData, 'newData');
  useEffect(() => {
    const getData = async () => {
      const navbarDataAPI = getNavbarList(TokenFromStore);
      console.log(navbarDataAPI, 'newData');
      dispatch(fetchCartListing(TokenFromStore?.token));
    };
    getData();
  }, []);

  const handleCurrencyValueChange = (curr: any) => {
    dispatch(setCurrencyValue(curr));
    setSelectedCurrencyValue(curr);
  };

  useEffect(() => {
    const url = new URL(window.location.href);

    // Get the URLSearchParams object from the URL
    const searchParams = url.searchParams;

    // Check if 'currency' key is present
    if (searchParams.has('currency')) {
      // Change the value to USD
      searchParams.set(
        'currency',
        `${currency_state_from_redux?.selected_currency_value}`
      );
      const updatedUrl = `${url.origin}${
        url.pathname
      }?${searchParams.toString()}`;
      push(updatedUrl);
    }

    if (
      navbarReduxStoreData?.loading === 'succeeded' &&
      navbarReduxStoreData.navbarData.data?.length
    ) {
      // BELOW CODE IS TO SORT NAVBAR DATA AND STORE IN THE STATE
      setNavbarData(
        [...navbarReduxStoreData?.navbarData?.data].sort(function (
          a: any,
          b: any
        ) {
          return a.seq - b.seq;
        })
      );

      setIsLoading(navbarReduxStoreData?.loading);
    } else {
      setNavbarData([]);
      setIsLoading(navbarReduxStoreData?.loading);
    }

    switch (currency_state_from_redux?.loading) {
      case 'pending':
        setSelectedCurrencyValue(
          currency_state_from_redux?.selected_currency_value
        );
        return;
      case 'succeeded':
        setSelectedCurrencyValue(
          currency_state_from_redux?.selected_currency_value
        );
        return;
      case 'failed':
        setSelectedCurrencyValue(
          currency_state_from_redux?.selected_currency_value
        );
        return;
    }
  }, [ currency_state_from_redux]);

  return {
    navbarData,
    isLoading,
    handleCurrencyValueChange,
    selectedCurrencyValue,
  };
};

export default useNavbar;
