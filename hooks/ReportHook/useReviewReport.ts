import React, { useEffect, useState } from 'react';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useReviewReport = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [reviewOrderData, setReviewOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const userId = localStorage.getItem('user');
  const fetchReviewOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getReviewOrderData = await getOrderReportAPI(tokenFromStore?.token, userId, 'review_dispatched_orders_list');
      if (getReviewOrderData?.status === 200 && getReviewOrderData?.data?.message?.msg === 'success') {
        setReviewOrderData(getReviewOrderData?.data?.message?.data);
      } else {
        setReviewOrderData([]);
        setErrMessage(getReviewOrderData?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewOrderReportDataFunction();
  }, []);

  return {
    reviewOrderData,
    isLoading,
    errorMessage,
  };
};

export default useReviewReport;
