import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import getPendingOrderReportAPI from '../../services/api/order-report-apis/pending-order-report-api';

const usePendingOrder = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const [pendingOrderData, setPendingOrderData] = useState<any>([]);
  const tokenFromStore: any = useSelector(get_access_token);

  const fetchPendingOrderReportDataFunction = async () => {
    setIsLoading(true);
    try {
      const getPendingData = await getPendingOrderReportAPI(tokenFromStore?.token, 'RISHI@GMAIL');
      console.log('banner', getPendingData);
      if (getPendingData?.status === 200 && getPendingData?.data?.status === 'Success') {
        setPendingOrderData(getPendingData?.data?.data);
      } else {
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
