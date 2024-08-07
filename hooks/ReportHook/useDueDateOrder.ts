import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';

const useDueDateOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [dueDateOrderData, setDueDateOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchDueDateOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getDueDateData = await getOrderReportAPI(tokenFromStore?.token, userId, 'due_date_orders_list');
      if (getDueDateData?.status === 200 && getDueDateData?.data?.message?.msg === 'success') {
        setDueDateOrderData(getDueDateData?.data?.message?.data);
      } else {
        setDueDateOrderData([]);
        setErrMessage(getDueDateData?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDueDateOrderReportDataFunction();
  }, []);

  return {
    dueDateOrderData,
    isLoading,
    errorMessage,
  };
};

export default useDueDateOrder;
