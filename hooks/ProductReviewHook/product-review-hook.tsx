import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { product_detail_data_selector_state } from '../../store/slices/product-detail-page-slices/product-detail-data-slice';
import { fetchProductReview, product_review_from_store } from '../../store/slices/product-detail-page-slices/product-review-slice/product-review-slice';

const useProductReview = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  console.log('product item router in details', query.product_id);
  const [reviewData, setReviewData] = useState<any>(null);
  const reviewDataFromStore = useSelector(product_review_from_store);
  const product_detail_data_from_redux = useSelector(product_detail_data_selector_state);
  console.log('product review data in hook', reviewDataFromStore);
  console.log('product item details data', product_detail_data_from_redux?.data?.name);
  const item_code = product_detail_data_from_redux?.data?.name;
  useEffect(() => {
    dispatch(fetchProductReview(item_code) as any);
  }, [dispatch, item_code]);

  useEffect(() => {
    if (reviewDataFromStore?.data) {
      setReviewData(reviewDataFromStore?.data);
    }
  }, [reviewDataFromStore]);

  return { reviewData, loading: reviewDataFromStore?.loading };
};

export default useProductReview;
