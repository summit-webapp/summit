import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchProductListingFromAPI from '../../services/api/product-listing-page-apis/get-product-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useProductListing = () => {
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const router = useRouter();
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const { query }: any = useRouter();
  const TokenFromStore: any = useSelector(get_access_token);

  const [toggleProductListView, setToggleProductListView] = useState('list-view');
  const [productListingData, setProductListingData] = useState<any>([]);
  const [productListTotalCount, setProductListTotalCount] = useState<number>(0);
  const [searchFilterValue, setSearchFilterValue] = useState<any>();
  const [sortBy, setSortBy] = useState('latest');
  const handleSortBy = (value: any) => {
    setSortBy(value);
    router.push({
      query: { ...query, sort_by: value, page: 1 },
    });
  };
  const handlePaginationBtn = (pageNo: any) => {
    router.push({
      query: { ...query, page: pageNo + 1 },
    });
  };
  const handleLoadMore = () => {
    const currentPage = Number(query.page) || 1;
    const nextPage = currentPage + 1;
    router.push({
      query: { ...query, page: nextPage },
    });
  };
  const handleFilterSearchFun: any = (e: any) => {
    setSearchFilterValue(e.target.value);
  };

  const handleFilterSearchBtn: any = () => {
    router.push({ query: { ...query, search_text: searchFilterValue } });
  };

  const handleToggleProductsListingView = (view_value?: any) => {
    if (view_value === 'list-view') {
      setToggleProductListView('list-view');
    } else {
      setToggleProductListView('grid-view');
    }
  };
  const fetchProductListDataAPI = async (reqParams: any) => {
    let productListDataAPI: any;
    setIsLoading(true);
    try {
      productListDataAPI = await fetchProductListingFromAPI(SUMMIT_APP_CONFIG, reqParams, TokenFromStore?.token);
      if (productListDataAPI?.data?.msg === 'success' && productListDataAPI?.data?.data?.length > 0) {
        if (CONSTANTS.SHOW_MORE_ITEMS === 'load-more') {
          setProductListingData((prevData: any) => [...prevData, ...productListDataAPI?.data?.message?.data]);
        } else if (CONSTANTS.SHOW_MORE_ITEMS === 'paginate') {
          setProductListingData([...productListDataAPI?.data?.data]);
        }
        setProductListTotalCount(productListDataAPI?.data?.total_count);
      } else {
        setProductListingData([]);
        setProductListTotalCount(0);
        setErrMessage(productListDataAPI?.data?.error || 'An unknown error occured.');
      }
    } catch (error) {
      setProductListingData([]);
      setErrMessage(productListDataAPI?.data?.error || 'An unknown error occured.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const catalogSlug = router.route.split('/')[1];
    if (catalogSlug === 'catalog') {
      setToggleProductListView('grid-view');
    } else {
      setToggleProductListView('list-view');
    }
  }, []);

  useEffect(() => {
    let storeUsefulParamsForFurtherProductListingApi;
    if (router.asPath === '/product-category') {
      router.push({
        query: {
          page: '1',
          currency: 'INR',
          sort_by: sortBy,
        },
      });
    }
    storeUsefulParamsForFurtherProductListingApi = {
      router_origin: router.route.split('/')[1],
      url_params: query,
      filterDoctype: 'Category',
      filterDocname: query?.category,
      listing_route: router.route,
      sort_by: sortBy,
    };
    fetchProductListDataAPI(storeUsefulParamsForFurtherProductListingApi);

    setSearchFilterValue(router.query.search_text);
  }, [query]);
  return {
    productListingData,
    productListTotalCount,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    handlePaginationBtn,
    // currency_state_from_redux,
    query,
    isLoading,
    errorMessage,
    sortBy,
    handleSortBy,
    handleFilterSearchFun,
    handleFilterSearchBtn,
    searchFilterValue,
  };
};
export default useProductListing;
