import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { currency_selector_state, setCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import getDisplaytagsDataFromAPI from '../../services/api/home-page-apis/home-display-tag-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useFeaturedCollections = (componentProperties: any) => {
  const dispatch = useDispatch();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;

  const [allTagsData, setAllTagsData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);
  const fetchDisplayTagsDataFunction = async (currency_value: any) => {
    const params: any = ['name', 'description', 'tag_image'];
    setIsLoading(true);
    try {
      const getDisplayTagsData = await getDisplaytagsDataFromAPI(
        SUMMIT_APP_CONFIG,
        params,
        componentProperties?.collection_name,
        currency_value,
        tokenFromStore?.token
      );
      console.log('getDisplayTagsData', getDisplayTagsData);

      if (getDisplayTagsData?.length > 0) {
        const tagsDataArray = getDisplayTagsData
          .map((data: any) => {
            if (data?.value?.msg === 'success') {
              return {
                tag_name: data.tag_name,
                description: data.description,
                value: data?.value?.data,
                tag_image: data?.tag_image,
              };
            } else {
              setErrMessage(data?.value?.error);
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

export default useFeaturedCollections;
