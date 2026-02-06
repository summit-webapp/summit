import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { TypeLoginAPIParams, TypeLoginForm } from '../../interfaces/login-params-interface';
import getTokenFromLoginAPI, { emrLogin } from '../../services/api/auth/get-token-from-login-api';
import { setShowSessionExpiredModalFalse, storeToken } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import { setDefaultCurrencyValue } from '../../store/slices/general_slices/multi-currency-slice';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../store/slices/general_slices/multilingual-slice';
import { languageDisplayOptions } from '../../utils/addon-utils/language-options';
import { Option } from '../../store/slices/general_slices/multilingual-slice';
import i18n from '../../i18n/i18n';
import useCurrencyLanguageHandler from '../GeneralHooks/LanguageHandler';
import { currencyOptions } from '../../utils/addon-utils/currency-map';
import useUserDefaultData from '../addon-hooks/kc-hooks/useUserData';
import { setCustomer, setDesignBankCount, setScope } from '../../store/slices/general_slices/kc-slice';

const useLoginHook = () => {
  const { AFTER_LOGIN_REDIRECT_URL } = CONSTANTS;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { handleCurrencyShallowUpdate, handleLanguageShallowUpdate } = useCurrencyLanguageHandler();
  const { fetchUserDefaultData } = useUserDefaultData();
  const [loginForm, setLoginForm] = useState<TypeLoginForm>({ usr: '', pwd: '' });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isLoginThroughOTP, setIsLoginThroughOTP] = useState<boolean>(false);
  const [isLoginThroughGoogle, setIsLoginThroughGoogle] = useState<boolean>(false);
  const [loginBtnLoader, setLoginBtnLoader] = useState<boolean>(false);
  const togglePasswordIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const fetchToken = async (values: TypeLoginForm) => {
    setLoginBtnLoader(true);
    try {
      const userParams: TypeLoginAPIParams = {
        values: { ...values },
        isGuest: false,
        loginViaOTP: false,
        LoginViaGoogle: false,
      };

      // const tokenData = await getTokenFromLoginAPI(SUMMIT_APP_CONFIG, userParams);
      // Need to check below login api logic. Need to make generic.
      const tokenData = await emrLogin(userParams);

      if (tokenData?.success === true && tokenData?.msg === 'success' && tokenData?.data?.hasOwnProperty('access_token')) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', values.usr);
        localStorage.setItem('party_name', tokenData?.data?.full_name);
        dispatch(setDesignBankCount(tokenData?.data?.count));

        if (tokenData?.data?.isPwdChg !== 0) {
          dispatch(storeToken(tokenData?.data));
        }
        
        fetchUserDefaultData(tokenData?.data?.access_token);
        setCustomer(null);
        setScope({ label: 'New Session (PDCM Design Bank)', value: 'Database' });
        
        // Redirect to the home page or any other page after successful login
        if (tokenData?.data?.isPwdChg === 0) {
          router.push('/forgot_password');
        } else {
          if (AFTER_LOGIN_REDIRECT_URL) {
            router.push(AFTER_LOGIN_REDIRECT_URL);
          } else {
            router.push('/')
          }
        }
        // toast.success('Login Successfully');
      }
    } catch (error: any) {
      if (error?.status === 400 && error?.response?.data?.error === "Invalid username or password") {
        toast.error(t('invalid_credentials'));
        return;
      } else {
        toast.error(t('error_while_login'));
      }
    } finally {
      setLoginBtnLoader(false);
    }
  };

  useEffect(() => {
    dispatch(setShowSessionExpiredModalFalse());
  }, []);
  
  return { passwordHidden, togglePasswordIcon, fetchToken, loginBtnLoader };
};

export default useLoginHook;
