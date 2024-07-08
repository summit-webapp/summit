import { useState } from 'react';

type TypeLoginForm = {
  usr: string;
  pwd: string;
};

const useLoginHook = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const togglePasswordIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };
  const user_params = {
    values: access_token,
    guest: guestLogin,
    isOtpLogin: isOtpLoginState,
    isGoogleLogin: true,
  };

  const fetchToken = (values: TypeLoginForm) => {
    console.log('value', values);
  };
  return { passwordHidden, togglePasswordIcon, fetchToken };
};

export default useLoginHook;
