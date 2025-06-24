import { useDispatch } from "react-redux";
import { clearToken, setShowSessionExpiredModalTrue } from "../../store/slices/auth/token-login-slice";


export const normalizeAPIResponse = (response: any) => {
  if (!response) {
    return {
      status: 500,
      data: null,
      error: 'No response from API',
    };
  }

  if (typeof response === 'string') {
    return {
      status: 500,
      data: null,
      error: response,
    };
  }
  
  if (response?.status && response?.data) {
    return {
      status: response.status,
      data: response.data,
      error: '',
    };
  }
  
  return {
    status: 500,
    data: null,
    error: 'Unknown error format',
  };
};

export default function useAuthErrorHandler() {
  const dispatch = useDispatch();

  const handleAuthError = (response: any, setLoading?: (state: boolean) => void, setError?: (error: string) => void) => {
    const normalized = normalizeAPIResponse(response);
    const errMsg = normalized.error || normalized.data.message;
    setError && setError(errMsg); 
    setLoading && setLoading(false);

    if (response?.status === 403 || response?.status === 401) {
      dispatch(clearToken());
      dispatch(setShowSessionExpiredModalTrue());
    }

    return errMsg;
  }

  return handleAuthError;
}
