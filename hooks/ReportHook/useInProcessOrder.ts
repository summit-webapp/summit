import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getPendingOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';

const useInProcessOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [processOrderData, setProcessOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchProceeOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getInProcessData = await getOrderReportAPI(tokenFromStore?.token, userId, 'in_process_orders_list');
      if (getInProcessData?.status === 200 && getInProcessData?.data?.message?.msg === 'success') {
        setProcessOrderData(getInProcessData?.data?.message?.data);
      } else {
        setErrMessage(getInProcessData?.data?.message?.error);
        getInProcessData([]);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProceeOrderReportDataFunction();
  }, []);

  return {
    processOrderData,
    isLoading,
    errorMessage,
  };
};

export default useInProcessOrder;
