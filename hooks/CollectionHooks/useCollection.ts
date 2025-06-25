import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getCollectionData from '../../services/api/home-page-apis/collection-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import useAuthErrorHandler from '../AuthHooks/handleAuthError';

const useCollection = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage } = useHandleStateUpdate();
  const [collectionData, setCollectionData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const handleAuthError = useAuthErrorHandler()

  const fetchCollectionsData = async () => {
    const collectionData = await getCollectionData('GET', 'get-collections-list-api', undefined, tokenFromStore?.token);
    if (collectionData?.status === 200 && collectionData?.data?.msg === 'success') {
      setCollectionData([...collectionData?.data?.data]);
    } else {
      handleAuthError(collectionData, undefined, setErrMessage)
    }
  };

  useEffect(() => {
    fetchCollectionsData();
  }, []);
  return { isLoading, collectionData, errorMessage };
};

export default useCollection;
