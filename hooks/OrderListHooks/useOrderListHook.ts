import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useSelector } from 'react-redux';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [orderListData, setOrderListData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);

  const fetchOrderList: any = async () => {
    setIsLoading(true);
    try {
      const getOrderList: any = await getOrderListAPI(tokenFromStore.token);
      console.log('get order list api res', getOrderList);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return { orderListData };
};

export default useOrderListHook;
