import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import getOrderListAPI from '../../services/api/order-apis/order-list-api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';

const useOrderListHook = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const { query }: any = useRouter();
  const router = useRouter();
  const tokenFromStore: any = useSelector(get_access_token);
  const [orderListData, setOrderListData] = useState<any>([]);
  const [history, setHistory] = useState(query?.date_range || 'this_month');
  const handleHistoryDate = (e: any) => {
    setHistory(e.target.value);
  };
  const handleUpdateQuery = (orderStatus: string, dateRange: string) => {
    router.push({
      query: { ...query, status: orderStatus, date_range: dateRange },
    });
  };
  const fetchOrderListingDataFun: any = async () => {
    let getOrderListingData: any;
    setIsLoading(true);
    const updateStatus: any = (query: any) => {
      if (query === 'completed-orders') {
        return 'Completed';
      } else if (query === 'cancelled-orders') {
        return 'Cancelled';
      } else {
        return '';
      }
    };

    const filterStatus = {
      status: updateStatus(query?.status) || '',
      date_range: query?.date_range || '',
    };
    /**
     * Fetches order listing data from the API using the given token and status.
     *
     * @async
     * @function getOrderListAPI
     * @param {Object} SUMMIT_APP_CONFIG - The Summit API SDK object used to interact with the API.
     * @param {string} token - The authentication token obtained from the store.
     * @param {string} status - The order status to filter the listing data. Could be any of 3 values 1. Completed 2.Cancelled or 3. ''.
     * @returns {Promise<void>} - Resolves when the API response is handled.
     * @throws {Error} Throws an error if the API call fails.
     */
    try {
      getOrderListingData = await getOrderListAPI(SUMMIT_APP_CONFIG, filterStatus, tokenFromStore.token);
      if (getOrderListingData?.status === 200 && getOrderListingData?.data?.message?.msg === 'success') {
        setOrderListData(getOrderListingData?.data?.message?.data);
      } else {
        setErrMessage(getOrderListingData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage(getOrderListingData?.data?.message?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query?.status) {
      fetchOrderListingDataFun();
    }
  }, [query]);
  useEffect(() => {
    handleUpdateQuery(query?.status || 'completed-orders', query?.data_range || history);
  }, [history]);

  return { orderListData, isLoading, errorMessage, history, handleHistoryDate, handleUpdateQuery };
};

export default useOrderListHook;
