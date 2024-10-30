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

  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  // const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);
  const [productDetailData, setProductDetailData] = useState<any>({});
  // Set if product detail data is variant that has opened. If Variant then check what's its template and set it.
  const [variantOf, setVariantOf] = useState<string>('');
  const [productVariantData, setProductVariantData] = useState([]);

  // Set Matching Items Data
  // Fetch Stock Availability Data
  const [stockAvailabilityData, setStockAvailabilityData] = useState<any>([]);
  const [qty, setQty] = useState<number>(1);
  const [itemList, setItemList] = useState<any>([
    {
      item_code: '',
      quantity: productDetailData?.min_order_qty || 1,
    },
  ]);
  const handleMultipleQtyChange = (index: number, itemCode: string, value: string) => {
    setItemList((prevItemList: any) => {
      if (!Array.isArray(prevItemList)) {
        // Handle the case where prevItemList is not an array
        return [];
      }
      const updatedItemList = [...prevItemList];
      updatedItemList[index] = {
        ...updatedItemList[index],
        item_code: itemCode,
        quantity: value,
      };
      return updatedItemList;
    });
  };
  const [variantLoading, setVariantLoading] = useState<boolean>(false);

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
        productDetailAPI?.data?.message?.msg === 'Success' &&
        Object?.keys(productDetailAPI?.data?.message?.data).length > 0
      ) {
        setProductDetailData(productDetailAPI?.data?.message?.data);
        if (productDetailAPI?.data?.message?.data?.min_order_qty > 0) {
          setQty(productDetailAPI?.data?.message?.data?.min_order_qty);
        } else {
          setQty(1);
        }
        if (productDetailAPI?.data?.message?.data?.variant_of) {
          setVariantOf(productDetailAPI?.data?.message?.data?.variant_of);
          fetchProductVariantDataAPI(productDetailAPI?.data?.message?.data?.variant_of);
        } else {
          setProductVariantData([]);
        }
      } else {
        setProductDetailData({});
        if (Object?.keys(productDetailAPI?.data?.message?.data).length === 0) {
          setErrMessage('Product Detail Data Not Found !!!');
        } else {
          setErrMessage(productDetailAPI?.data?.message?.data?.error);
        }
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
    } else if (qty - 1 >= productDetailData?.min_order_qty) {
      setQty(qty - 1);
    }
  };

  const handleQtyModificationOnInputEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: any = e.target;
    const newQty = Number(value);
    setQty(newQty);
  };

  const handleStockAvailabilityData = async (setStockAvailabilityLoader: any) => {
    setStockAvailabilityLoader(true);
    try {
      const requestParams = {
        item_code: productDetailData?.name,
        qty: qty,
      };
      const getStockAvailabilityDataOfProduct = await fetchStockAvailabilityOfProduct(
        SUMMIT_APP_CONFIG,
        requestParams,
        TokenFromStore?.token
      );
      if (getStockAvailabilityDataOfProduct?.status === 200 && getStockAvailabilityDataOfProduct?.data?.message?.msg === 'success') {
        setStockAvailabilityData(getStockAvailabilityDataOfProduct?.data?.message?.data);
      } else {
        setStockAvailabilityData([]);
      }
    } catch (error) {
      setStockAvailabilityData([]);
      console.error('Error fetching stock availability:', error);
    } finally {
      setStockAvailabilityLoader(false);
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
    variantLoading,
    stockAvailabilityData,
    handleStockAvailabilityData,
    handleQtyModificationOnButtonClick,
    handleQtyModificationOnInputEdit,
    itemList,
    qty,
    handleMultipleQtyChange,
  };
};

export default useProductDetail;
