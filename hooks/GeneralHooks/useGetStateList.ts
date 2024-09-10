import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchStateListAPI from '../../services/api/general-apis/get-state-list-api';

const useGetStatesData = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const [stateList, setStateList] = useState<any>([]);
  const fetchStateList = async () => {
    setIsLoading(true);
    try {
      let statesList: any = await fetchStateListAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (statesList?.status === 200 && statesList?.data?.message?.msg === 'success') {
        setStateList([...statesList?.data?.message?.data]);
      } else {
        setStateList([]);
        setErrMessage(statesList?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch State List');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStateList();
  }, []);
  return {
    statesListLoading: isLoading,
    statesListError: errorMessage,
    stateList,
  };
};

export default useGetStatesData;
