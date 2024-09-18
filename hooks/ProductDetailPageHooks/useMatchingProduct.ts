import { useEffect, useState } from 'react';
import fetchProductMatchingItems from '../../services/api/product-detail-page-apis/get-product-matching-items';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useMatchingProduct = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { query } = useRouter();
  const [matchingProducts, setMatchingProducts] = useState<any>([]);
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const itemOptions = ['Suggested', 'Alternate', 'Equivalent', 'Mandatory'];
  const fetchMatchingItemsAPI = async () => {
    setIsLoading(true);
    try {
      const getMatchingItemsData: any = await fetchProductMatchingItems(
        SUMMIT_APP_CONFIG,
        itemOptions,
        query?.productId,
        'INR'
        // TokenFromStore?.token
      );
      if (getMatchingItemsData?.length > 0) {
        setMatchingProducts(getMatchingItemsData);
      } else {
        setMatchingProducts([]);
        setErrMessage('Products Not Found');
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMatchingItemsAPI();
  }, []);
  return {
    fetchMatchingItemsAPI,
    isLoading,
    matchingProducts,
  };
};

export default useMatchingProduct;
