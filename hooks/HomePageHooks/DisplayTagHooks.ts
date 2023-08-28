import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  display_tags,
  fetchDisplayTags,
  testReducer,
} from "../../store/slices/home_page_slice/home-display-tag-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import {
  currency_selector_state,
  setCurrencyValue,
  setDefaultCurrencyValue,
} from "../../store/slices/general_slices/multi-currency-slice";

const useDisplayTagHooks = () => {
  const dispatch = useDispatch();

  const currency_state_from_redux: any = useSelector(currency_selector_state);

  const [allTagsData, setAllTagsData] = useState<any>([]);

  const TokenFromStore: any = useSelector(get_access_token);

  const fetchDisplayTagsDataFunction = (currency_value: any) => {
    dispatch(
      fetchDisplayTags({
        token: TokenFromStore?.token,
        currencyValue: currency_value,
      })
    );

    dispatch(setCurrencyValue(currency_value));
  };

  useEffect(() => {
    fetchDisplayTagsDataFunction(
      currency_state_from_redux?.selected_currency_value
    );
  }, []);

  return {
    allTagsData,
    fetchDisplayTagsDataFunction,
  };
};

export default useDisplayTagHooks;
