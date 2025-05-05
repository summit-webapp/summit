import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getCollectionData from '../../services/api/home-page-apis/collection-api';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
const useCollection = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage } = useHandleStateUpdate();
  const [collectionData, setCollectionData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchCollectionsData = async () => {
    const collectionData = await getCollectionData('GET', 'get-collection-data-api', undefined, tokenFromStore?.token);
    console.log('collection data', collectionData);
  };

  useEffect(() => {
    fetchCollectionsData();
  }, []);
  return { isLoading, collectionData, errorMessage };
};

export default useCollection;
