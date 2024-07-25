import { useEffect, useState } from 'react';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { useRouter } from 'next/router';
import { fetchProductDetailData } from '../../services/api/product-detail-page-api/product-detail-data-api';

const useProductDetail = () => {
  const { query } = useRouter();
  console.log(query, 'query');
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [productDetailData, setProductDetailData] = useState([]);

  const fetchProductDetailDataAPI = async () => {
    setIsLoading(true);
    try {
      const productDetailAPI: any = await fetchProductDetailData(query?.product_id,currency_state_from_redux,TokenFromStore?.token);
      console.log(productDetailAPI,'query')
      if (productDetailAPI?.data?.message?.msg === 'Success' && productDetailAPI?.data?.message?.data?.length) {
        setProductDetailData(productDetailAPI?.data?.message?.data[0]);
      } else {
        setProductDetailData([]);
        setErrMessage(productDetailAPI?.data?.message?.data?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetailDataAPI();
  }, []);
  return {
    productDetailData,
  };
};

export default useProductDetail;
