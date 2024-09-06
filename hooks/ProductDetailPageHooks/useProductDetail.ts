import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import fetchProductDetailData from '../../services/api/product-detail-page-apis/get-product-detail';
import fetchProductVariant from '../../services/api/product-detail-page-apis/get-product-variants';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { CONSTANTS } from '../../services/config/app-config';
import fetchProductMatchingItems from '../../services/api/product-detail-page-apis/get-product-matching-items';
import fetchStockAvailabilityOfProduct from '../../services/api/product-detail-page-apis/get-product-stock-availability';
import fetchProductReview from '../../services/api/product-detail-page-apis/get-product-review';
import UploadReviewPhotoAPI from '../../services/api/utils/upload-file-api';

const useProductDetail = () => {
  const { query } = useRouter();
  const router = useRouter();

  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  // const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [productDetailData, setProductDetailData] = useState<any>({});
  // Set if product detail data is variant that has opened. If Variant then check what's its template and set it.
  const [variantOf, setVariantOf] = useState<string>('');
  const [productVariantData, setProductVariantData] = useState([]);
  // Set Matching Items Data
  const [matchingItemsData, setMatchingItemsData] = useState<any>([]);

  // Fetch Stock Availability Data
  const [stockAvailabilityData, setStockAvailabilityData] = useState<any>([]);
  const [qty, setQty] = useState<number>(1);
  const [variantLoading, setVariantLoading] = useState<boolean>(false);

  const itemOptions = ['Suggested', 'Alternate', 'Equivalent', 'Mandatory'];

  const fetchProductDetailDataAPI = async () => {
    const requestParams = {
      item: query?.productId,
      currency: 'INR',
    };
    setIsLoading(true);
    try {
      const productDetailAPI: any = await fetchProductDetailData(SUMMIT_APP_CONFIG, requestParams, TokenFromStore?.token);
      if (
        productDetailAPI?.status === 200 &&
        productDetailAPI?.data?.message?.msg === 'Success' 
        
      ) {
        setProductDetailData(productDetailAPI?.data?.message?.data);
        if (productDetailAPI?.data?.message?.data?.variant_of) {
          setVariantOf(productDetailAPI?.data?.message?.data?.variant_of);

          if (productDetailAPI?.data?.message?.data?.variant_of) {
            fetchProductVariantDataAPI(productDetailAPI?.data?.message?.data?.variant_of);
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

  // Need to handle min quantity of product

  // Need to handle qty increase of product
  const handleQtyModificationOnButtonClick = (actionType: string) => {
    if (actionType === 'increase') {
      setQty(qty + 1);
    } else {
      setQty(qty - 1);
    }
  };

  const handleQtyModificationOnInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target;
    setQty(value);
  };

  // Need to handle addCart (call addToCartItem func from addToCart hook)

  // Need to create function to handleRedirect onClick of variant
  const handleRedirectOnProductVariantButtonClick = (variant_code: any) => {
    if (query?.productId) {
      router.push({
        query: { ...query, productId: variant_code },
      });
    }
  };

  // Need to create matching items api call
  const fetchMatchingItemsAPI = async () => {
    const getMatchingItemsData: any = await fetchProductMatchingItems(
      SUMMIT_APP_CONFIG,
      itemOptions,
      query?.productId,
      'INR',
      TokenFromStore?.token
    );
    if (getMatchingItemsData?.status === 200) {
    } else {
    }
  };

  const handleStockAvailabilityData = async () => {
    const requestParams: any = {
      item_code: productDetailData?.name,
      qty: qty,
    };
    const getStockAvailabilityDataOfProduct = await fetchStockAvailabilityOfProduct(
      SUMMIT_APP_CONFIG,
      requestParams,
      TokenFromStore?.token
    );
    if (getStockAvailabilityDataOfProduct?.status === 200) {
      setStockAvailabilityData(getStockAvailabilityDataOfProduct?.data?.message);
    } else {
      setStockAvailabilityData([]);
    }
  };

  const getProductReview = async () => {
    const requestParams = { item_code: query?.productId };
    const productReviewData = await fetchProductReview(SUMMIT_APP_CONFIG, requestParams, TokenFromStore?.token);
    if (productReviewData?.status === 200) {
    } else {
    }
  };

  const uploadReviewImage = async (imgFile: any) => {
    const handleUploadImgData = await UploadReviewPhotoAPI(imgFile, TokenFromStore?.token);
    if (handleUploadImgData?.status === 200) {
    } else {
    }
  };

  const productSpecification = async () => {};

  useEffect(() => {
    fetchProductDetailDataAPI();
  }, [query?.productId]);
  return {
    isLoading,
    errorMessage,
    productDetailData,
    productVariantData,
    fetchProductDetailDataAPI,
    handleRedirectOnProductVariantButtonClick,
    variantLoading,
    stockAvailabilityData,
    handleStockAvailabilityData,
    handleQtyModificationOnButtonClick,
    handleQtyModificationOnInputEdit,
  };
};

export default useProductDetail;
