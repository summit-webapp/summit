import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailPageThunk, product_detail_data_selector_state } from '../../../store/slices/product-detail-page-slices/product-detail-data-slice';
import { fetchStockAvailability, stock_availability_state } from '../../../store/slices/product-detail-page-slices/product-stock-availability-slice';
import { get_access_token, updateAccessToken } from '../../../store/slices/auth/token-login-slice';
import { ProductMatchingItemOptions, product_matching_items_selector_state } from '../../../store/slices/product-detail-page-slices/product-item-options-slice';
import { currency_selector_state } from '../../../store/slices/general_slices/multi-currency-slice';
import { CONSTANTS } from '../../../services/config/app-config';
import useAddToCartHook from '../../GeneralHooks/CommonHooks/add-to-cart-functions-hooks';
import { SelectedFilterLangDataFromStore } from '../../../store/slices/general_slices/selected-multilanguage-slice';
import useLanguageHook from '../../GeneralHooks/CommonHooks/language_common_hooks';

const useProductDetails = () => {
  const router = useRouter();
  const { query }: any = useRouter();
  const dispatch = useDispatch();

  const product_detail_data_from_redux = useSelector(product_detail_data_selector_state);

  const stock_availability_data_from_redux = useSelector(stock_availability_state);

  const TokenFromStore: any = useSelector(get_access_token);
  const token = TokenFromStore?.token;

  const product_matching_items_data_from_redux = useSelector(product_matching_items_selector_state);

  const currency_state_from_redux: any = useSelector(currency_selector_state);

  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  let isDealer: any;
  let isLoggedIn: any;
  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
    isDealer = localStorage.getItem('isDealer');
  }

  const productID = query.product_id;

  // States
  const [productImageLoading, setProductImageLoading] = useState<any>(false);
  const [productDetailLoading, setProductDetailLoading] = useState<any>(false);
  const [productDetailData, setProductDetailData] = useState<any>({});
  const [productImages, setProductImages] = useState<any>([]);
  const [newobjectState, setnewObjectState] = useState<any>([]);
  let [minQty, setMinQty] = useState<any>('');
  const [checkStock, setCheckStock] = useState<boolean>(false);
  const [stockAvailability, setStockAvailability] = useState<any>([]);
  const [selectedVariantCodeForAddToCart, setSelectedVariantCodeForAddToCart] = useState('');
  let [selectedVariant, setSelectedVariant] = useState<any>({});
  let [thumbnailOfVariants, setThumbnailOfVariants] = useState<any>({});
  const [doesSelectedVariantDoesNotExists, setDoesSelectedVariantDoesNotExists] = useState(false);
  const [stockDoesNotExistsForSelectedVariants, setStockDoesNotExistsForSelectedVariants] = useState(false);

  // Language code
  const { selectedMultiLangData } = useLanguageHook();
  // Language code

  useEffect(() => {
    dispatch(
      ProductDetailPageThunk({
        productID: productID,
        currency: query.currency,
        token: token,
      }) as any
    );
  }, [query]);

  useEffect(() => {
    //   loop to set the data of product details in state
    switch (product_detail_data_from_redux?.loading) {
      case 'pending':
        setProductDetailLoading(true);
        setProductImageLoading(true);
        setProductDetailData({});
        break;
      case 'succeeded':
        if (product_detail_data_from_redux?.data?.hasOwnProperty('name')) {
          setProductDetailData(product_detail_data_from_redux.data);
        } else {
          setProductDetailData({});
        }
        setProductDetailLoading(false);
        setProductImageLoading(false);
        break;
      case 'failed':
        setProductDetailLoading(false);
        setProductImageLoading(false);
        setProductDetailData({});
        break;
    }
  }, [product_detail_data_from_redux]);

  const handleCreationOfProductEnlargeImages = () => {
    let templateImages: any = [];
    if (productDetailData?.slide_img?.length > 0) {
      productDetailData?.slide_img?.map((imgs: any) => {
        templateImages.push({
          original: `${CONSTANTS.API_BASE_URL}${imgs}`,
          thumbnail: `${CONSTANTS.API_BASE_URL}${imgs}`,
          variant_code: productDetailData?.name,
        });
      });

      setProductImages([...templateImages]);
    } else {
      setProductImages([]);
    }
  };

  useEffect(() => {
    handleCreationOfProductEnlargeImages();
  }, [productDetailData]);

  // Add to cart Functions Hook.
  const {
    productQuantity,
    setProductQuantity,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    handleAddCartB2c,
    isLoading,
    stockAvailabilityTextChanges,
    singleProductForAddToCart,
    setSingleProductForAddToCart,
    quantityOfSingleProduct,
  } = useAddToCartHook(productID, currency_state_from_redux, token);
  // End Add to cart Functions Hook.

  //  Check Future Stock
  const handleStockAvail = (item_code: any) => {
    const fixedOffset = 200; // Adjust this value as needed

    if (isDealer === 'true') {
      const params = {
        item_code: item_code,
        qty: quantityOfSingleProduct[0],
        token: token,
      };
      dispatch(fetchStockAvailability(params));

      setTimeout(() => {
        window.scrollTo({
          top: fixedOffset,
          behavior: 'smooth',
        });
      }, 100);
      setCheckStock(true);
    } else {
      const params = {
        item_code: item_code,
        qty: productQuantity,
        token: token,
      };

      dispatch(fetchStockAvailability(params));

      setTimeout(() => {
        window.scrollTo({
          top: fixedOffset,
          behavior: 'smooth',
        });
      }, 100);
      setCheckStock(true);
    }
  };

  useEffect(() => {
    if (stock_availability_data_from_redux?.data?.length > 0 && stock_availability_data_from_redux !== null) {
      setStockAvailability(stock_availability_data_from_redux?.data);
    }
  }, [stock_availability_data_from_redux]);
  // End Check Future Stock

  // B2C Variant Code start
  useEffect(() => {
    if (productDetailData?.product_attributes) {
      setSelectedVariant(productDetailData.product_attributes);
    } else {
    }
  }, [productDetailData]);

  const handleVariantSelect = (key: any, value: any) => {
    // Create a new object with the updated value
    const updatedVariant = { ...selectedVariant, [key]: value };
    // Update the state with the new object
    setSelectedVariant(updatedVariant);
  };
  // Define a function to find the matching variant based on selected characteristics
  const findVariantCode = (variants: any, selectedVariant: any) => {
    // Find the variant that matches all key-value pairs in selectedVariant
    if (Object.keys(selectedVariant).length !== 0) {
      const matchingVariant = variants?.find((variant: any) => {
        // Ensure all key-value pairs in selectedVariant match the variant
        return Object.keys(selectedVariant).every((key) => variant[key] === selectedVariant[key]);
      });

      return matchingVariant ? matchingVariant.slug : null;
    }
    // Return the variant code if a match is found; otherwise, return null or undefined
    // return null
  };

  // Get the variant code for the selected variant

  const variantCode = findVariantCode(productDetailData.variants, selectedVariant);
  useEffect(() => {
    // Check if the variant code is already in the query to avoid unnecessary updates
    if (variantCode === null) {
      setDoesSelectedVariantDoesNotExists(true);
    } else {
      setDoesSelectedVariantDoesNotExists(false);
    }
    if (variantCode && query.product_id !== variantCode) {
      // Inject the variant code into the URL query if it's different from the current product_id
      const updatedQuery = { ...query, product_id: variantCode };

      router.push(
        {
          pathname: router.pathname,
          query: updatedQuery,
        },
        undefined,
        { shallow: true } // Prevent full page reload
      );
    }
  }, [variantCode, query]);

  // End B2C Variant Code start

  return {
    productImageLoading,
    productDetailLoading,
    productDetailData,
    productImages,
    handleStockAvail,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    productQuantity,
    stockAvailabilityTextChanges,
    isDealer,
    isLoggedIn,
    checkStock,
    currency_state_from_redux,
    newobjectState,
    setnewObjectState,
    doesSelectedVariantDoesNotExists,
    stockDoesNotExistsForSelectedVariants,
    stockAvailability,
    handleVariantSelect,
    selectedVariant,
    handleAddCartB2c,
    isLoading,
    thumbnailOfVariants,
    selectedMultiLangData,
    token,
    singleProductForAddToCart,
    setSingleProductForAddToCart,
    quantityOfSingleProduct,
  };
};

export default useProductDetails;
