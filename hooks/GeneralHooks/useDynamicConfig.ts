import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchDynamicConfig from '../../services/api/general-apis/get-dynamic-config';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';

const useDynamicConfig = (scope: string, sectionType: string) => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const handleAuthError = useAuthErrorHandler();
  
  const [dynamicConfig, setDynamicConfig] = useState<any[]>([]);

  const fetchConfig = async () => {
    if (!scope || !sectionType) return;
    
    setIsLoading(true);
    try {
      let requestParams = { scope, sectionType };
      let response: any = await fetchDynamicConfig(SUMMIT_APP_CONFIG, requestParams, tokenFromStore?.token);
      
      if (response?.status === 200 && response?.data?.success) {
        // Find the specific sectionType config from the data array
        const configData = response?.data?.data?.find((item: any) => item.code === sectionType);
        
        if (configData && configData.fields) {
          setDynamicConfig([...configData.fields]);
        } else {
          setDynamicConfig([]);
        }
      } else {
        setDynamicConfig([]);
        handleAuthError(response, setIsLoading, setErrMessage);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Dynamic Config');
      setDynamicConfig([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, [scope, sectionType]); // Refetch if scope or sectionType changes

  return {
    configLoading: isLoading,
    configError: errorMessage,
    dynamicConfig,
    fetchConfig, // Exported in case manual refetch is needed
  };
};

export default useDynamicConfig;
