import React, { useEffect, useState } from 'react';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useLateOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [lateOrderData, setLateOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchLateOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getLateOrderData = await getOrderReportAPI(tokenFromStore?.token, userId, 'late_orders_list');
      if (getLateOrderData?.status === 200 && getLateOrderData?.data?.message?.msg === 'success') {
        setLateOrderData(getLateOrderData?.data?.message?.data);
      } else {
        setLateOrderData([]);
        setErrMessage(getLateOrderData?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLateOrderReportDataFunction();
  }, []);

  return {
    lateOrderData,
    isLoading,
    errorMessage,
  };
};

export default useLateOrder;
