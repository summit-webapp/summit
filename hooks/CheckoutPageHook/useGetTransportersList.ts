import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchTransportersListAPI from '../../services/api/checkout/get-transporters-list-api';

const useGetTransportersList = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const [transportersList, setTransportersList] = useState<string[]>([]);
  const fetchTransportersList = async () => {
    setIsLoading(true);
    try {
      let transportersData: any = await fetchTransportersListAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (transportersData?.status === 200 && transportersData?.data?.message?.msg === 'success') {
        setTransportersList([...transportersData?.data?.message?.data]);
      } else {
        setTransportersList([]);
        setErrMessage(transportersData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Transporters List');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportersList();
  }, []);
  return {
    transportersListLoading: isLoading,
    transportersListErr: errorMessage,
    transportersList,
  };
};

export default useGetTransportersList;
