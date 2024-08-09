import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getOrderDetailAPI from '../../services/api/order-detail-apis/order-detail-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useOrderDetailHook = () => {
  const { query } = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const tokenFromStore: any = useSelector(get_access_token);

  const [orderData, setOrderData] = useState<any>({});

  const fetchOrderData: any = async () => {
    setIsLoading(true);
    try {
      let orderDetailData: any = await getOrderDetailAPI(tokenFromStore.token, query.orderId);

      if (orderDetailData?.data?.message?.message === 'Success' && orderDetailData?.status === 200) {
        setOrderData(orderDetailData?.data?.message);
      } else {
        setOrderData([]);
        setErrMessage(orderDetailData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch Order data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [query]);

  return { orderData, isLoading, errorMessage };
};

export default useOrderDetailHook;
