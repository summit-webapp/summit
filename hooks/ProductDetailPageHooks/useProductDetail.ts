import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import fetchProductDetailData from '../../services/api/product-detail-page-apis/get-product-detail';
import fetchProductVariant from '../../services/api/product-detail-page-apis/get-product-variants';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';

const useProductDetail = () => {
  const { query } = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  // const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [productDetailData, setProductDetailData] = useState({});
  // Set if product detail data is variant that has opened. If Variant then check what's its template and set it.
  const [variantOf, setVariantOf] = useState<string>('');
  const [productVariantData, setProductVariantData] = useState([]);
  const [variantLoading, setVariantLoading] = useState<boolean>(false);

  const fetchProductDetailDataAPI = async () => {
    setIsLoading(true);
    try {
      const productDetailAPI: any = await fetchProductDetailData(SUMMIT_APP_CONFIG, query?.productId, 'INR', TokenFromStore?.token);
      if (
        productDetailAPI?.status === 200 &&
        productDetailAPI?.data?.message?.msg === 'Success' &&
        productDetailAPI?.data?.message?.data?.length
      ) {
        setProductDetailData(productDetailAPI?.data?.message?.data[0]);
        if (productDetailAPI?.data?.message?.data[0]?.variant_of) {
          setVariantOf(productDetailAPI?.data?.message?.data[0]?.variant_of);

          if (productVariantData === null || productVariantData?.length === 0) {
            fetchProductVariantDataAPI(productDetailAPI?.data?.message?.data[0]?.variant_of);
          }
        } else {
          setProductVariantData([]);
        }
      } else {
        setProductDetailData({});
        setErrMessage(productDetailAPI?.data?.message?.data?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProductVariantDataAPI = async (templateName: string) => {
    setVariantLoading(true);
    try {
      const productVariantAPI: any = await fetchProductVariant(SUMMIT_APP_CONFIG, templateName, TokenFromStore?.token);
      if (productVariantAPI?.status === 200 && productVariantAPI?.data?.message?.msg === 'success') {
        setProductVariantData(productVariantAPI?.data?.message?.data);
      } else {
        setProductVariantData([]);
        setErrMessage(productVariantAPI);
      }
    } catch (error) {
      return;
    } finally {
      setVariantLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetailDataAPI();
  }, [query?.productId]);
  return {
    isLoading,
    errorMessage,
    productDetailData,
    productVariantData,
    fetchProductDetailDataAPI,
    variantLoading,
  };
};

export default useProductDetail;
