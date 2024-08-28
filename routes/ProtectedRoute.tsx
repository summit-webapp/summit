import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '../store/slices/auth/token-login-slice';
const ProtectedRoute = ({ children }: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const router = useRouter();
  useEffect(() => {
    if (TokenFromStore.token === '') {
      router.push('/login');
    }
  }, [TokenFromStore]);
  return children;
};

export default ProtectedRoute;
