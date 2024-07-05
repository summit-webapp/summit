import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { currency_selector_state, setCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import getDisplaytagsDataFromAPI from '../../services/api/home_page_api/home-display-tag-api';

const useDisplayTagHooks = () => {
  const dispatch = useDispatch();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [allTagsData, setAllTagsData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);

  const fetchDisplayTagsDataFunction = async (currency_value: any) => {
    let getDisplayTagsData: any = await getDisplaytagsDataFromAPI('token 717050306808084:4d7b1daa1ee4cb3', currency_value);
    console.log('getDisplayTagData', getDisplayTagsData);
    if (getDisplayTagsData?.length > 0) {
      setAllTagsData(getDisplayTagsData);
    }

    dispatch(setCurrencyValue(currency_value));
  };
  const fetchCurrencyValue = () => {
    const currencyValue =
      currency_state_from_redux?.selected_currency_value !== ''
        ? currency_state_from_redux?.selected_currency_value
        : currency_state_from_redux?.default_currency_value;

    fetchDisplayTagsDataFunction(currencyValue);
  };
  useEffect(() => {
    fetchCurrencyValue();
  }, [currency_state_from_redux]);

  return {
    allTagsData,
    fetchDisplayTagsDataFunction,
  };
};

export default useDisplayTagHooks;
