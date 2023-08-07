import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  ProductDetailPageThunk,
  product_detail_data_selector_state,
} from "../../store/slices/product-detail-page-slices/product-detail-data-slice";
import {
  ProductVariantsThunk,
  product_variants_selector_state,
} from "../../store/slices/product-detail-page-slices/product-variants-data-slice";
import { CONSTANTS } from "../../services/config/app-config";
import {
  ProductMatchingItemOptions,
  product_matching_items_selector_state,
} from "../../store/slices/product-detail-page-slices/product-item-options-slice";
import {
  fetchStockAvailability,
  stock_availability_state,
} from "../../store/slices/product-detail-page-slices/product-stock-availability-slice";
import useProductDetailFunctions from "./product-detail-functions-hook";

const useProductDetailNewHook = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const product_detail_data_from_redux = useSelector(
    product_detail_data_selector_state
  );
  const product_variants_data_from_redux = useSelector(
    product_variants_selector_state
  );
  const stock_availability_data_from_redux = useSelector(
    stock_availability_state
  );

  const product_matching_items_data_from_redux = useSelector(
    product_matching_items_selector_state
  );

  const productID = router.query.product_id;

  const { handleSettingOfSelectedVariantsAndThumbnailOfVariants } =
    useProductDetailFunctions();

  const [productDetailData, setProductDetailData] = useState<any>({});
  const [productVariants, setProductVariants] = useState<any>({});

  let [selectedVariant, setSelectedVariant] = useState<any>({});
  let [thumbnailOfVariants, setThumbnailOfVariants] = useState<any>({});

  const [productEnlargeImages, setProductEnlargeImages] = useState<any>([]);
  const [storeTemplateImages, setStoreTemplateImages] = useState<any>([]);

  const [selectedVariantCodeForAddToCart, setSelectedVariantCodeForAddToCart] = useState('');
  let [minQty, setMinQty] = useState<any>("");

  const handleCreationOfProductEnlargeImages = () => {
    console.log("images in handle func", productDetailData);
    if (productDetailData?.slide_img?.length > 0) {
      let templateImages: any = [];
      productDetailData?.slide_img?.map((imgs: any) => {
        templateImages.push({
          original: `${CONSTANTS.API_BASE_URL}${imgs}`,
          thumbnail: `${CONSTANTS.API_BASE_URL}${imgs}`,
          variant_code: productDetailData?.name,
        });
      });

      setProductEnlargeImages(templateImages);
    } else {
      setProductEnlargeImages([]);
    }
    let imgArr: any = [];

    if (Object.keys(selectedVariant).length > 0) {
      console.log("rastafari 2", selectedVariant);
      const matchedVariant = productVariants?.variants?.find((variant: any) =>
        Object.entries(selectedVariant).every(
          ([key, value]) => variant[key] === value
        )
      );
      console.log("util format matched variant", matchedVariant);
      setSelectedVariantCodeForAddToCart(matchedVariant?.variant_code);
      matchedVariant?.image?.map((imgs: any) => {
        imgArr.push({
          original: `${CONSTANTS.API_BASE_URL}${imgs}`,
          thumbnail: `${CONSTANTS.API_BASE_URL}${imgs}`,
          variant_code: 0,
        });
      });
      setProductEnlargeImages([...imgArr, ...productEnlargeImages]);
    }
  };


  // BELOW USE-EFFECT's TO CALL API's
  useEffect(() => {
    dispatch(ProductDetailPageThunk(productID) as any);
  }, [productID]);

  useEffect(() => {
    dispatch(ProductVariantsThunk(productID) as any);
    dispatch(ProductMatchingItemOptions(productID) as any);
  }, []);

  useEffect(() => {
    handleCreationOfProductEnlargeImages();
  }, []);
  useEffect(() => {
    setMinQty(product_detail_data_from_redux?.min_qty);
  }, [productDetailData]);

  // BELOW USE-EFFECT's TO STORE DATA FROM REDUX STORE TO LOCAL STATE
  useEffect(() => {
    switch (product_detail_data_from_redux?.loading) {
      case "pending":
        setProductDetailData({});
        break;
      case "succeeded":
        if (product_detail_data_from_redux?.data?.hasOwnProperty("name")) {
          setProductDetailData(product_detail_data_from_redux.data);
        } else {
          setProductDetailData({});
        }
        break;
      case "failed":
        setProductDetailData({});
        break;
    }
  }, [product_detail_data_from_redux]);

  useEffect(() => {
    switch (product_variants_data_from_redux?.loading) {
      case "pending":
        setProductVariants({});
        break;
      case "succeeded":
        setProductVariants(product_variants_data_from_redux.data);
        break;
      case "failed":
        setProductVariants({});
        break;
    }

    if (
      product_variants_data_from_redux?.data?.variants?.length > 0 &&
      product_variants_data_from_redux?.data?.attributes?.length > 0
    ) {
      const { generateSelectedVariants, generateThumbnailOfVariants } =
        handleSettingOfSelectedVariantsAndThumbnailOfVariants(
          product_variants_data_from_redux?.data
        );
      setSelectedVariant({ ...generateSelectedVariants });
      setThumbnailOfVariants({ ...generateThumbnailOfVariants });
    }
  }, [
    product_variants_data_from_redux,
    product_matching_items_data_from_redux,
  ]);
};
