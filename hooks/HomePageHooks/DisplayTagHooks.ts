import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { currency_selector_state, setCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import getDisplaytagsDataFromAPI from '../../services/api/home-page-apis/home-display-tag-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useDisplayTagHooks = () => {
  const dispatch = useDispatch();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;

  const [allTagsData, setAllTagsData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);
  console.log(currency_state_from_redux, 'currency_state_from_redux');
  const fetchDisplayTagsDataFunction = async (currency_value: any) => {
    setIsLoading(true);
    try {
      const getDisplayTagsData = await getDisplaytagsDataFromAPI(SUMMIT_APP_CONFIG, currency_value, tokenFromStore?.token);

      if (getDisplayTagsData?.length > 0) {
        const tagsDataArray = getDisplayTagsData
          .map((data: any) => {
            if (data?.value?.message?.msg === 'success') {
              return {
                tag_name: data.tag_name,
                value: data?.value?.message?.data,
              };
            } else {
              setErrMessage(data?.value?.message?.error);
              return null;
            }
          })
          .filter((data: any) => data !== null);

        setAllTagsData(tagsDataArray);
      } else {
        setAllTagsData([]);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
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
    isLoading,
    errorMessage,
  };
};

export default useDisplayTagHooks;
