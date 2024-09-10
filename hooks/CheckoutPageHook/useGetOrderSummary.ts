import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import fetchOrderSummaryAPI from '../../services/api/checkout/get-order-summary-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useOrderSummary = (quotationId: string) => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore: any = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const [orderSummary, setOrderSummary] = useState<any>({});
  const getOrderSummary = async (quotationId: string) => {
    setIsLoading(true);
    try {
      let orderSummaryData: any = await fetchOrderSummaryAPI(SUMMIT_APP_CONFIG, quotationId, tokenFromStore.token);
      if (orderSummaryData?.status === 200 && orderSummaryData?.data?.message?.msg === 'success') {
        setOrderSummary(orderSummaryData?.data?.message?.data);
      } else {
        setOrderSummary({});
        setErrMessage(orderSummaryData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Order Summary Data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (quotationId) {
      getOrderSummary(quotationId);
    }
  }, [quotationId]);
  return {
    orderSummaryLoading: isLoading,
    orderSummaryError: errorMessage,
    orderSummary,
  };
};

export default useOrderSummary;
