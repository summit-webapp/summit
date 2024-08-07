import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';

const useDispatchsOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [disptachOrderData, setDisptachOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchDispatchOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getDispatchOrderData = await getOrderReportAPI(tokenFromStore?.token, userId, 'dispatched_orders_list');
      if (getDispatchOrderData?.status === 200 && getDispatchOrderData?.data?.message?.msg === 'success') {
        setDisptachOrderData(getDispatchOrderData?.data?.message?.data);
      } else {
        setDisptachOrderData([]);
        setErrMessage(getDispatchOrderData?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDispatchOrderReportDataFunction();
  }, []);

  return {
    disptachOrderData,
    isLoading,
    errorMessage,
  };
};

export default useDispatchsOrder;
