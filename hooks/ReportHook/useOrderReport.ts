import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';
import { useRouter } from 'next/router';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

const useOrderReport = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [OrderReportData, setOrderReportData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);
  const router: any = useRouter();
  let paramsValue: any;
  const userId = localStorage.getItem('user');
  const fetchOrderReportDataFunction = async () => {
    switch (router?.query?.order_report) {
      case 'due-date-reminder-report':
        paramsValue = 'due_date_orders_list';
        break;
      case 'review-report':
        paramsValue = 'review_dispatched_orders_list';
        break;
      case 'pending-order':
        paramsValue = 'pending_orders_list';
        break;
      case 'dispatched-orders-report':
        paramsValue = 'dispatched_orders_list';
        break;
      case 'in-process-orders-report':
        paramsValue = 'in_process_orders_list';
        break;
      case 'late-orders-report':
        paramsValue = 'late_orders_list';
        break;
    }
    setIsLoading(true);
    try {
      const getDispatchOrderData = await getOrderReportAPI(tokenFromStore?.token, userId, paramsValue);
      if (getDispatchOrderData?.status === 200 && getDispatchOrderData?.data?.message?.msg === 'success') {
        setOrderReportData(getDispatchOrderData?.data?.message?.data);
      } else {
        setOrderReportData([]);
        setErrMessage(getDispatchOrderData?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderReportDataFunction();
  }, [router]);

  return {
    OrderReportData,
    isLoading,
    errorMessage,
    router,
  };
};

export default useOrderReport;
