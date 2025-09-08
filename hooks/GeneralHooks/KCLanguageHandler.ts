import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SelectedLangFromStore, setLanguage } from '../../store/slices/general_slices/multilingual-slice';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';
import { currency_selector_state, setCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import { updateCart } from '../../services/addon-services/api/emr-api\'s/voucher-api\'s/create-voucher-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { languageDisplayOptions } from '../../utils/addon-utils/kc-language-options';
import { Option } from '../../store/slices/general_slices/multilingual-slice';
import { currencyOptions } from '../../utils/addon-utils/kc-currency-map';

const useCurrencyLanguageHandler = () => {
  const dispatch = useDispatch();
  const languageState = useSelector(SelectedLangFromStore)?.selectedLanguage;
  const TokenFromStore: any = useSelector(get_access_token);
  const currencyState = useSelector(currency_selector_state)?.selected_currency_value;
  const handleAuthError = useAuthErrorHandler();
  const selectedCurrency = currencyOptions.filter((opt) => currencyState ? opt?.value === currencyState : opt?.value === 'RS')[0];
  const selectedLanguage = languageDisplayOptions.filter((opt) => languageState ? opt?.value === languageState : opt?.value === 'en')[0];
  
  const updateUserPreference = async (langCode: string, currency: string) => {
    const apiBody = {
      userPreferences:{
        language: languageDisplayOptions.find((opt: Option) => opt?.value === langCode)?.label,
        currency: currency,
      }
    };

    const response = await updateCart('PUT', 'update-user-preferences', apiBody, TokenFromStore?.token);

    if (response?.status === 200 && response?.data?.msg === 'success') {
      i18n.changeLanguage(langCode).catch((err) => {});
      localStorage.setItem('selected_currency', currency);
      localStorage.setItem('selected_language', languageDisplayOptions.find((opt: Option) => opt?.value === langCode)?.label as string)
    } else {
      handleAuthError(response);
    }
  };

  const handleLanguageChange = (value: Option | undefined | null) => {
    dispatch(setLanguage(value?.value));
    updateUserPreference(value?.value as string, selectedCurrency?.value);
  };

  const handleLanguageShallowUpdate = (value: Option | undefined | null) => {
    dispatch(setLanguage(value?.value));
    i18n.changeLanguage(value?.value as string).catch((err) => {});
  };

  const handleCurrencyChange = (value: Option | undefined | null) => {
    dispatch(setCurrencyValue(value?.value));
    updateUserPreference(selectedLanguage?.value, value?.value as string);
  };
  
  const handleCurrencyShallowUpdate = (value: Option | undefined | null) => {
    dispatch(setCurrencyValue(value?.value));
  }

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
