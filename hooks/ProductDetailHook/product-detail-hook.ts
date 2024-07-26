import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { fetchProductDetailData } from '../../services/api/product-detail-page-api/product-detail-data-api';
import { fetchProductVariant } from '../../services/api/product-detail-page-api/product-variants-data-api';

const useProductDetail = () => {
  const { query } = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [productDetailData, setProductDetailData] = useState([]);
  const [productVariantData, setProductVariantData] = useState([]);

  const fetchProductDetailDataAPI = async () => {
    setIsLoading(true);
    try {
      const productDetailAPI: any = await fetchProductDetailData(query?.product_id, currency_state_from_redux, TokenFromStore?.token);
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
  const fetchProductVariantDataAPI = async () => {
    const item_code = (query?.product_id as string)?.split('-')[0];
    const productVariantAPI: any = await fetchProductVariant(item_code, TokenFromStore?.token);
    if (productVariantAPI?.data?.message?.msg === 'success') {
      setProductVariantData(productVariantAPI?.data?.message?.data);
    } else {
      setProductVariantData([]);
    }
  };
  useEffect(() => {
    fetchProductDetailDataAPI();
    fetchProductVariantDataAPI();
  }, [query?.product_id]);
  return {
    productDetailData,
    productVariantData,
    fetchProductDetailDataAPI
  };
};

export default useProductDetail;
