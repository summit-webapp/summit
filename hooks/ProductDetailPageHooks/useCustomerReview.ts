import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../../services/config/app-config';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import fetchProductReview from '../../services/api/product-detail-page-apis/get-product-review';
import UploadReviewPhotoAPI from '../../services/api/utils/upload-file-api';
import PostProductReviewAPI from '../../services/api/product-detail-page-apis/post-new-product-review';

const useCustomerReview = () => {
  const { query } = useRouter();
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const TokenFromStore: any = useSelector(get_access_token);
  const [reviewPhotos, setReviewPhotos] = useState<any[]>([]);
  const [reviewList, setReviewList] = useState<any[]>([]);
  const [value, setValue] = React.useState<any>(1);
  const [showForm, setShowForm] = useState(false);

  let ratingValues: any = value / 5;
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const getProductReview = async () => {
    const requestParams = { item_code: query?.productId };
    setIsLoading(true);
    try {
      const productReviewData = await fetchProductReview(SUMMIT_APP_CONFIG, requestParams, TokenFromStore?.token);
      if (productReviewData?.status === 200 && productReviewData?.data?.message?.msg === 'success') {
        setReviewList(productReviewData?.data?.message?.data);
      } else {
        setReviewList([]);
        setErrMessage(productReviewData?.data?.message?.data?.error);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadReviewImage = async (imgFile: any) => {
    const handleUploadImgData = await UploadReviewPhotoAPI(imgFile, TokenFromStore?.token);
    if (handleUploadImgData?.status === 200 && Object.keys(handleUploadImgData).length > 0) {
      setReviewPhotos([...reviewPhotos, { image: handleUploadImgData?.data?.message?.file_url }]);
    }
  };
  useEffect(() => {
    getProductReview();
  }, []);

  const initialValues = {
    name: '',
    email: '',
    item_code: query?.productId,
    images: reviewPhotos,
    comment: '',
    rating: ratingValues,
  };
  const handleRating = (val: any) => {
    setValue(val);
  };
  const handleFormSubmit = async (values: any, resetForm: any) => {
    let reviewData = { ...values, rating: ratingValues, images: reviewPhotos };
    let response = await PostProductReviewAPI(SUMMIT_APP_CONFIG, reviewData, TokenFromStore.token);
    if (response?.data?.message?.msg === 'success') {
      getProductReview();
      setShowForm(false);
    } 
    setValue('');
    setReviewPhotos([]);
    resetForm();
    setShowForm(false)
  };  
   const handleToggleReviewForm = () => {
    setShowForm(!showForm);
  };
  const handleClose = () => setShowForm(false);
  return {
    getProductReview,
    uploadReviewImage,
    TokenFromStore,
    setReviewPhotos,
    reviewPhotos,
    reviewList,
    isLoading,
    handleRating,
    handleFormSubmit,
    handleToggleReviewForm,
    showForm,
    initialValues,
    handleClose,
  };
};

export default useCustomerReview;
