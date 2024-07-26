import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ProductDetailPageThunk, product_detail_data_selector_state } from '../../store/slices/product-detail-page-slices/product-detail-data-slice';
import { ProductVariantsThunk, product_variants_selector_state } from '../../store/slices/product-detail-page-slices/product-variants-data-slice';
import { CONSTANTS } from '../../services/config/app-config';
import { ProductMatchingItemOptions, product_matching_items_selector_state } from '../../store/slices/product-detail-page-slices/product-item-options-slice';
import getStockAvailability from '../../services/api/product-detail-page-api/product-stock-availability-api';
import { fetchStockAvailability, stock_availability_state } from '../../store/slices/product-detail-page-slices/product-stock-availability-slice';
import useProductDetailFunctions from './product-detail-functions-hook';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';

const useProductDetailOld = () => {
  const router = useRouter();
  const { query }: any = useRouter();
  const dispatch = useDispatch();

  const product_detail_data_from_redux = useSelector(product_detail_data_selector_state);
  const product_variants_data_from_redux = useSelector(product_variants_selector_state);
  const stock_availability_data_from_redux = useSelector(stock_availability_state);

  const TokenFromStore: any = useSelector(get_access_token);
  const product_matching_items_data_from_redux = useSelector(product_matching_items_selector_state);

  const currency_state_from_redux: any = useSelector(currency_selector_state);

  console.log('product_variants_data_from_redux', product_variants_data_from_redux);
  let isDealer: any;
  if (typeof window !== 'undefined') {
    isDealer = localStorage.getItem('isDealer');
  }
  const productID = router.query.product_id;

  const { handleSettingOfSelectedVariantsAndThumbnailOfVariants } = useProductDetailFunctions();

  const [productImageLoading, setProductImageLoading] = useState<any>(false);
  const [productDetailLoading, setProductDetailLoading] = useState<any>(false);
  const [productDetailData, setProductDetailData] = useState<any>({});
  const [productImages, setProductImages] = useState<any>([]);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [newobjectState, setnewObjectState] = useState<any>([]);
  let [minQty, setMinQty] = useState<any>('');
  const [stockAvailabilityTextChanges, setstockAvailabilityTextChanges] = useState(false);
  const [checkStock, setCheckStock] = useState<boolean>(false);
  const [stockAvailability, setStockAvailability] = useState<any>([]);
  const [selectedVariantCodeForAddToCart, setSelectedVariantCodeForAddToCart] = useState('');
  const [productVariants, setProductVariants] = useState<any>({});

  let [selectedVariant, setSelectedVariant] = useState<any>({});
  let [thumbnailOfVariants, setThumbnailOfVariants] = useState<any>({});

  const [doesSelectedVariantDoesNotExists, setDoesSelectedVariantDoesNotExists] = useState(false);
  const [stockDoesNotExistsForSelectedVariants, setStockDoesNotExistsForSelectedVariants] = useState(false);

  const [productItemOptions, setProductItemOptions] = useState([]);

  // console.log("detail page router", router);
  // console.log("detail page router", stock_availability_data_from_redux);

  const handleCreationOfProductEnlargeImages = () => {
    console.log('creation', productDetailData);
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
    let imgArr: any = [];

    if (Object.keys(selectedVariant).length > 0) {
      console.log('rastafari 2', selectedVariant);
      const matchedVariant = productVariants?.variants?.find((variant: any) => Object.entries(selectedVariant).every(([key, value]) => variant[key] === value));
      console.log('util format matched variant', matchedVariant);
      if (matchedVariant !== undefined) {
        setDoesSelectedVariantDoesNotExists(false);
        if (matchedVariant?.stock) {
          setStockDoesNotExistsForSelectedVariants(false);
        } else {
          setStockDoesNotExistsForSelectedVariants(true);
        }
        matchedVariant?.image?.map((imgs: any) => {
          imgArr.push({
            original: `${CONSTANTS.API_BASE_URL}${imgs}`,
            thumbnail: `${CONSTANTS.API_BASE_URL}${imgs}`,
            variant_code: 0,
          });
        });
      } else {
        setDoesSelectedVariantDoesNotExists(true);
        setStockDoesNotExistsForSelectedVariants(false);
      }
      setSelectedVariantCodeForAddToCart(matchedVariant?.variant_code);
      // imgArr.push(productImages);
      setProductImages([...imgArr, ...templateImages]);
    }
    console.log('creation', templateImages);
  };

  const testBtn = () => {
    router.push(`/product/riding-gloves/7`);
  };

  const handleVariantSelect = (key: any, value: any) => {
    // Create a new object with the updated value
    const updatedVariant = { ...selectedVariant, [key]: value };
    // Update the state with the new object
    setSelectedVariant(updatedVariant);
  };

  const handleQuantity = (val: any) => {
    setProductQuantity(val);
  };

  const handleQuantityIncrement = () => {
    setProductQuantity(Number(productQuantity + 1));
    setstockAvailabilityTextChanges(true);

    setTimeout(() => {
      setstockAvailabilityTextChanges(false);
    }, 600);
  };

  const handleQuantityDecrement = () => {
    if (productQuantity !== minQty) {
      setProductQuantity(Number(productQuantity - 1));
    } else {
    }
    setstockAvailabilityTextChanges(true);

    setTimeout(() => {
      setstockAvailabilityTextChanges(false);
    }, 600);
  };

  const handleStockAvail = (item_code: any) => {
    console.log('input qty object', newobjectState);

    const fixedOffset = 200; // Adjust this value as needed

    if (isDealer === 'true') {
      const params = {
        item_code: item_code,
        qty: newobjectState[0]?.quantity,
        token: TokenFromStore?.token,
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
        token: TokenFromStore?.token,
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
    console.log('currency in prod detail', query);
    dispatch(
      ProductDetailPageThunk({
        productID: productID,
        currency: 'INR',
        token: TokenFromStore?.token,
      }) as any
    );
    dispatch(
      ProductVariantsThunk({
        productID: productID,
        token: TokenFromStore?.token,
      }) as any
    );
    dispatch(
      ProductMatchingItemOptions({
        productID: productID,
        currency: query.currency,
        token: TokenFromStore?.token,
      }) as any
    );
  }, [query]);

  useEffect(() => {
    setMinQty(product_detail_data_from_redux?.min_qty);
  }, [productDetailData]);

  useEffect(() => {
    handleCreationOfProductEnlargeImages();
  }, [selectedVariant]);

  useEffect(() => {
    switch (product_detail_data_from_redux?.loading) {
      case 'pending':
        setProductDetailLoading(true);
        setProductImageLoading(true);
        setProductDetailData({});
        break;
      case 'succeeded':
        if (product_detail_data_from_redux?.data?.hasOwnProperty('name')) {
          setProductDetailData(product_detail_data_from_redux.data);
          const keysToExtract = ['alternate', 'equivalent', 'suggested', 'mandatory'];
          const filteredKeys = keysToExtract.filter((key) => product_detail_data_from_redux?.data[key] === true);
          // console.log("true keys", filteredKeys);
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

    switch (product_variants_data_from_redux?.loading) {
      case 'pending':
        setProductVariants({});
        break;
      case 'succeeded':
        setProductVariants(product_variants_data_from_redux.data);
        break;
      case 'failed':
        setProductVariants({});
        break;
    }

    if (product_matching_items_data_from_redux?.data?.length > 0) {
      setProductItemOptions(product_matching_items_data_from_redux?.data);
    } else {
      setProductItemOptions([]);
    }

    if (product_variants_data_from_redux?.data?.variants?.length > 0 && product_variants_data_from_redux?.data?.attributes?.length > 0) {
      const { generateSelectedVariants, generateThumbnailOfVariants } = handleSettingOfSelectedVariantsAndThumbnailOfVariants(
        product_variants_data_from_redux?.data
      );
      setSelectedVariant({ ...generateSelectedVariants });
      setThumbnailOfVariants({ ...generateThumbnailOfVariants });
    } else {
      if (product_detail_data_from_redux?.data?.slide_img?.length > 0) {
        let temporaryStoreTemplateImages: any = [];
        product_detail_data_from_redux.data?.slide_img?.map((templateImgs: any) => {
          temporaryStoreTemplateImages.push({
            original: `${CONSTANTS.API_BASE_URL}${templateImgs}`,
            thumbnail: `${CONSTANTS.API_BASE_URL}${templateImgs}`,
            variant_code: 0,
          });
        });
        // console.log("rastafari 1", temporaryStoreTemplateImages);
        if (temporaryStoreTemplateImages?.length > 0) {
          // console.log("rastafari images", temporaryStoreTemplateImages);
          setProductImages([...temporaryStoreTemplateImages]);
        }
        // setStockDoesNotExistsForSelectedVariants()
      } else {
        setProductImages([]);
      }
      if (product_detail_data_from_redux?.data?.in_stock_status === false) {
        setStockDoesNotExistsForSelectedVariants(true);
      } else {
        setStockDoesNotExistsForSelectedVariants(false);
      }

      setSelectedVariantCodeForAddToCart(product_detail_data_from_redux?.data?.name);
    }
  }, [product_detail_data_from_redux, product_matching_items_data_from_redux, product_variants_data_from_redux]);

  useEffect(() => {
    if (stock_availability_data_from_redux?.data?.length > 0 && stock_availability_data_from_redux !== null) {
      setStockAvailability(stock_availability_data_from_redux?.data);
    }
  }, [stock_availability_data_from_redux]);

  // console.log("productItemOptions in hook end", productItemOptions);
  return {
    productImageLoading,
    productDetailLoading,
    productDetailData,
    productVariants,
    selectedVariant,
    thumbnailOfVariants,
    handleVariantSelect,
    productImages,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    productQuantity,
    minQty,
    stockAvailabilityTextChanges,
    handleStockAvail,
    checkStock,
    stockAvailability,
    testBtn,
    doesSelectedVariantDoesNotExists,
    stockDoesNotExistsForSelectedVariants,
    productItemOptions,
    currency_state_from_redux,
    newobjectState,
    setnewObjectState,
  };
};

export default useProductDetailOld;
