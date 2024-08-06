import { useSelector } from 'react-redux';
import { get_access_token } from '../store/slices/auth/token-login-slice';

const checkAuthorizedUser = () => {
  const TokenFromStore: any = useSelector(get_access_token);
  if (TokenFromStore?.token !== '') {
    return true;
  } else {
    return false;
  }
};

export default checkAuthorizedUser;
