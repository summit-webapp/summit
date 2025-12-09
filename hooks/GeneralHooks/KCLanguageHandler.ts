import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedLangFromStore, setLanguage } from '../../store/slices/general_slices/multilingual-slice';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';
import { currency_selector_state, setCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import { updateCart } from '../../services/addon-services/api/emr-api\'s/voucher-api\'s/create-voucher-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { languageDisplayOptions } from '../../utils/addon-utils/language-options';
import { Option } from '../../store/slices/general_slices/multilingual-slice';
import { currencyOptions } from '../../utils/addon-utils/currency-map';
import { useEffect } from 'react';

const useCurrencyLanguageHandler = (postUserDefaultData?: (token: string, DefCurrency: string, DefLang: string, RefreshRt: string, LabRt: string, RMCtg: string, voucherModeType: string ) => void, userDefaultData?: any) => {
  const dispatch = useDispatch();
  const languageState = useSelector(SelectedLangFromStore)?.selectedLanguage?.trim();
  const TokenFromStore: any = useSelector(get_access_token);
  const currencyState = useSelector(currency_selector_state)?.selected_currency_value?.trim();
  const handleAuthError = useAuthErrorHandler();
  const selectedCurrency = currencyOptions.find((opt) => opt?.value === (currencyState))!;
  const selectedLanguage = languageDisplayOptions.find((opt) => opt?.value === languageState)!;
  
  const updateUserPreference = async (language: Option, currency: Option) => {
    const languageCode = language?.value.toString();
    const currencyCode = currency?.value.toString()
    const apiBody = {
      userPreferences:{
        language: languageDisplayOptions.find((opt: Option) => opt?.value === languageCode)?.label,
        currency: currencyCode,
      }
    };

    const response = await updateCart('PUT', 'update-user-preferences', apiBody, TokenFromStore?.token);

    if (response?.status === 200 && response?.data?.msg === 'success') {
      i18n.changeLanguage(languageCode).catch((err) => {});
      localStorage.setItem('selected_currency', currencyCode);
      localStorage.setItem('selected_language', languageDisplayOptions.find((opt: Option) => opt?.value === languageCode)!.label)
    } else {
      handleAuthError(response);
    }
  };

  const handleLanguageChange = (value: Option) => {
    dispatch(setLanguage(value?.value));
    // updateUserPreference(value, selectedCurrency);
    postUserDefaultData && postUserDefaultData(TokenFromStore?.token, languageDisplayOptions.find((opt: Option) => opt?.value === value?.value?.toString())?.label!?.trim(), userDefaultData?.DefCurrency, userDefaultData?.RefreshRt, userDefaultData?.LabRt, userDefaultData?.RMCtg, userDefaultData?.voucherModeType);
  };

  const handleLanguageShallowUpdate = (value: Option) => {
    dispatch(setLanguage(value?.value));
    i18n.changeLanguage(value?.value as string).catch((err) => {});
  };

  const handleCurrencyChange = (value: Option) => {
    dispatch(setCurrencyValue(value?.value));
    // updateUserPreference(selectedLanguage, value);
    postUserDefaultData && postUserDefaultData(TokenFromStore?.token, userDefaultData?.DefLang, value?.value.toString().trim(), userDefaultData?.RefreshRt, userDefaultData?.LabRt, userDefaultData?.RMCtg, userDefaultData?.voucherModeType);
  };
  
  const handleCurrencyShallowUpdate = (value: Option) => {
    dispatch(setCurrencyValue(value?.value));
  }

  useEffect(() => {
    handleLanguageShallowUpdate(selectedLanguage);
    handleCurrencyShallowUpdate(selectedCurrency);
  },[selectedCurrency, selectedLanguage]);

  return {
    handleLanguageShallowUpdate,
    handleCurrencyShallowUpdate,
    handleLanguageChange,
    handleCurrencyChange,
    selectedLanguage,
    selectedCurrency
  };
};

export default useCurrencyLanguageHandler;
