import React, { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import getCompletedOrderListAPI from '../../services/api/order-apis/completed-orders-list-api';
import getCancelledOrderListAPI from '../../services/api/order-apis/cancelled-orders-list-api';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const router = useRouter();
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
    let getOrderListingData: any;
    switch (router?.pathname) {
      case '/orders/order-list':
        getOrderListingData = await getOrderListAPI(tokenFromStore.token);
        if (getOrderListingData?.status === 200) {
          getOrderListingApiRes(getOrderListingData);
        } else {
          getOrderListingData(null);
        }
        break;

      case '/orders/completed-orders':
        getOrderListingData = await getCompletedOrderListAPI(tokenFromStore.token);
        if (getOrderListingData?.status === 200) {
          getOrderListingApiRes(getOrderListingData);
        } else {
          getOrderListingData(null);
        }
        break;
      case '/orders/cancelled-orders':
        getOrderListingData = await getCancelledOrderListAPI(tokenFromStore.token);
        if (getOrderListingData?.status === 200) {
          getOrderListingApiRes(getOrderListingData);
        } else {
          getOrderListingData(null);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    fetchOrderListingDataFun();
  }, []);

  return { orderListData, isLoading, errorMessage };
};

export default useOrderListHook;
