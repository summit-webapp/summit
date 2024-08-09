import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const { query }: any = useRouter();

  const [orderListData, setOrderListData] = useState<any>([]);

  const tokenFromStore: any = useSelector(get_access_token);

  const getOrderListingApiRes: any = (response: any) => {
    try {
      if (response?.data?.message?.msg === 'success') {
        let data: any = response.data.message.data;
        setOrderListData(data);
      } else {
        setOrderListData([]);
        setErrMessage(response?.data?.message?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderListingDataFun: any = async () => {
    setIsLoading(true);

    const updateStatus: any = (query: any) => {
      if (query === 'completed-orders') {
        return 'Completed';
      } else if (query === 'cancelled-orders') {
        return 'Cancelled';
      }
    };

    const status: any = updateStatus(query?.id);

    const getOrderListingData = await getOrderListAPI(tokenFromStore.token, status);
    if (getOrderListingData?.status === 200) {
      getOrderListingApiRes(getOrderListingData);
    } else {
      getOrderListingApiRes(null);
    }
  };

  useEffect(() => {
    fetchOrderListingDataFun();
  }, [query]);

  return { orderListData, isLoading, errorMessage };
};

export default useOrderListHook;
