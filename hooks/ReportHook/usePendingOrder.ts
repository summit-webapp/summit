import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';

const usePendingOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [pendingOrderData, setPendingOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchPendingOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getPendingData = await getOrderReportAPI(tokenFromStore?.token, userId, 'pending_orders_list');
      if (getPendingData?.status === 200 && getPendingData?.data?.message?.msg === 'success') {
        setPendingOrderData(getPendingData?.data?.message?.data);
      } else {
        setErrMessage(getPendingData?.data?.message?.error);
        setPendingOrderData([]);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrderReportDataFunction();
  }, []);

  return {
    pendingOrderData,
    isLoading,
    errorMessage,
  };
};

export default usePendingOrder;
