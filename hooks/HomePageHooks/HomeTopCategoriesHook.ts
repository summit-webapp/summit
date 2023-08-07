import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomeTopCategoriesDataFromAPI,
  home_top_categories_selector_state,
} from "../../store/slices/home_page_slice/home-top-categories-slice";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useHomeTopCategories = () => {
  const dispatch = useDispatch();
  const homeTopCategoriesReduxStoreData: any = useSelector(
    home_top_categories_selector_state
  );
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token)

  const [selectedCurrencyVal, setSelectedVal] = useState()
  const [homeTopCategories, setHomeTopCategories] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>("pending");

  useEffect(() => {
    if (homeTopCategoriesReduxStoreData?.homeTopCategoriesData?.length === 0) {
    }
    dispatch(fetchHomeTopCategoriesDataFromAPI(TokenFromStore?.token) as any);
  }, []);


  useEffect(() => {
    setSelectedVal(currency_state_from_redux?.selected_currency_value)
  }, [currency_state_from_redux]);
  useEffect(() => {
    console.log("top categories redux store", homeTopCategoriesReduxStoreData);
    if (homeTopCategoriesReduxStoreData?.homeTopCategoriesData?.length > 0) {
      setHomeTopCategories(homeTopCategoriesReduxStoreData?.homeTopCategoriesData);
      setIsLoading(homeTopCategoriesReduxStoreData?.loading)
    }
    else {
      setHomeTopCategories([]);
    }
  }, [homeTopCategoriesReduxStoreData])
  console.log(homeTopCategories, "homeTopCategories")

  return { homeTopCategories, isLoading, selectedCurrencyVal };
};

export default useHomeTopCategories;
