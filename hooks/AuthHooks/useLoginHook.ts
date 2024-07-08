import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { TypeLoginAPIParams, TypeLoginForm } from '../../interfaces/login-params-interface';
import getTokenFromLoginAPI from '../../services/api/auth/get-token-from-login-api';
import sendOTPToUserAPI from '../../services/api/auth/get-otp-api';
import { storeToken } from '../../store/slices/auth/token-login-slice';

const useLoginHook = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<TypeLoginForm>({ usr: '', pwd: '' });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isLoginThroughOTP, setIsLoginThroughOTP] = useState<boolean>(false);
  const [isLoginThroughGoogle, setIsLoginThroughGoogle] = useState<boolean>(false);
  const togglePasswordIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const fetchToken = async (values: TypeLoginForm) => {
    console.log('value', values);
    const userParams: TypeLoginAPIParams = {
      values: { ...values },
      isGuest: false,
      loginViaOTP: false,
      LoginViaGoogle: false,
    };
    const tokenData = await getTokenFromLoginAPI(userParams);
    if (tokenData?.msg === 'success' && tokenData?.data?.hasOwnProperty('access_token')) {
      localStorage.setItem('isLoggedIn', 'true');
      dispatch(storeToken(tokenData?.data));
      router.push('/');
      setTimeout(() => {
        // showToast('Login Successfully', 'success');
      }, 1200);
    } else {
      // showToast('Invalid Credentials. Please try again.', 'error');
    }
  };
  return { passwordHidden, togglePasswordIcon, fetchToken };
};

export default useLoginHook;
