import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  ProductListingThunk,
  product_listing_selector_state,
} from "../../store/slices/product-listing-page-slices/product-listing-slice";
import {
  FiltersThunk,
  filters_selector_state,
} from "../../store/slices/product-listing-page-slices/filters-slice";
import {
  products_view_state,
  setProductsView,
} from "../../store/slices/product-listing-page-slices/view-slice";
import { CONSTANTS } from "../../services/config/app-config";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useProductListing = () => {
  const router = useRouter();
  const { query }: any = useRouter();
  console.log(router, "routers");
  const dispatch = useDispatch();

  const product_listing_state_from_redux: any = useSelector(
    product_listing_selector_state
  );
  const tokens = useSelector(get_access_token);
  const currency_state_from_redux: any = useSelector(currency_selector_state);

  const filters_state_from_redux: any = useSelector(filters_selector_state);

  const product_view_slice_from_redux: any = useSelector(products_view_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);
  const [toggleProductListView, setToggleProductListView] =
    useState("list-view");
  const [pageNo, setpageNo] = useState<number>(1);

  let [productListingData, setProductListingData] = useState<any>([]);
  const [productListTotalCount, setProductListTotalCount] = useState<number>(0);
  const [filtersData, setFiltersData] = useState<any>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>([]);

  const handlePaginationBtn = (pageNo: any) => {
    router.push({
      query: { ...query, page: pageNo + 1 },
    });
  };

  console.log("product listing router",currency_state_from_redux);

  const handleApplyFilters = async (event: any) => {
    let duplicateFilters: any;
    const section = event.target.name;
    const filterValue = event.target.value;
    const isChecked = event.target.checked;

    await setSelectedFilters((prevFilters: any) => {
      let updatedFilters = [...prevFilters];

      const existingSectionIndex = prevFilters.findIndex(
        (filter: any) => filter.name === section
      );

      if (existingSectionIndex !== -1) {
        if (isChecked) {
          updatedFilters[existingSectionIndex].value = [
            ...updatedFilters[existingSectionIndex].value,
            filterValue,
          ];
        } else {
          updatedFilters[existingSectionIndex].value = updatedFilters[
            existingSectionIndex
          ].value.filter((val: any) => val !== filterValue);
          if (updatedFilters[existingSectionIndex].value.length === 0) {
            updatedFilters = updatedFilters.filter(
              (filter) => filter.name !== section
            );
          }
        }
      } else if (isChecked) {
        updatedFilters.push({ name: section, value: [filterValue] });
      }
      duplicateFilters = [...updatedFilters];
      return updatedFilters;
    });
    // console.log("night duplicate filters", duplicateFilters);
    const filterString = encodeURIComponent(JSON.stringify(duplicateFilters));
    let url = router.asPath;
    const existingFilterIndex = url.indexOf("&filter=");
    if (existingFilterIndex !== -1) {
      const ampIndex = url.indexOf("&", existingFilterIndex + 1);
      if (ampIndex !== -1) {
        url = url.slice(0, existingFilterIndex) + url.slice(ampIndex);
      } else {
        url = url.slice(0, existingFilterIndex);
      }
    }
    url += `&filter=${filterString}`;
    await router.push(url);
  };
  const handleLoadMore = () => {
    const currentPage = Number(query.page) || 1;
    const nextPage = currentPage + 1;
    router.push({
      query: { ...query, page: nextPage },
    });
  };
  useEffect(() => {
    const catalogSlug = router.route.split('/')[1];
    console.log(catalogSlug,"newSlug ")
    if(catalogSlug === 'catalog') {
      dispatch(setProductsView("grid-view"));
    }
    else {
      dispatch(setProductsView("list-view"));
    }
  
  }, []);
  const handleToggleProductsListingView = (view_value?: any) => {
    if (view_value === "list-view") {
      dispatch(setProductsView("list-view"));
    } else {
      dispatch(setProductsView("grid-view"));
    }
  };
  const checkFiltersValue = () => {
    console.log("filters check", selectedFilters);
  };
  const handleProductListingForLoadMore = () => {
    if (CONSTANTS.ENABLE_LOAD_MORE) {
      console.log(
        "product listing in grid hook",
        product_listing_state_from_redux.productListData
      );
      setProductListingData(
        (productListingData = [
          ...productListingData,
          ...product_listing_state_from_redux.productListData,
        ])
      );
    }
    if (CONSTANTS.ENABLE_PAGINATION) {
      console.log(
        "product listing in grid hook",
        product_listing_state_from_redux.productListData
      );
      setProductListingData(
        (productListingData = [
          ...productListingData,
          ...product_listing_state_from_redux.productListData,
        ])
      );
    }
  };
  useEffect(() => {
    // console.log("multi currency in prod list hook",currency_value_from_redux);
    let storeUsefulParamsForFurtherProductListingApi
    if(router.asPath==="/product-category"){
      router.push({
        query: { page: '1', currency: currency_state_from_redux?.selected_currency_value },
      });
     storeUsefulParamsForFurtherProductListingApi = {
      router_origin: router.route.split("/")[1],
      url_params: query,
      filterDoctype: filters_state_from_redux?.doctype,
      filterDocname: filters_state_from_redux?.docname.toLowerCase(),
      token: TokenFromStore?.token,
      listing_route:router.route
    };
  
  }
  else {
    storeUsefulParamsForFurtherProductListingApi = {
      router_origin: router.route.split("/")[1],
      url_params: query,
      filterDoctype: filters_state_from_redux?.doctype,
      filterDocname: filters_state_from_redux?.docname.toLowerCase(),
      token: TokenFromStore?.token,
      listing_route:router.route
    };
  }
    console.log(
      storeUsefulParamsForFurtherProductListingApi,
      "storeUsefulParamsForFurtherProductListingApi"
    );
    dispatch(
      ProductListingThunk({
        storeUsefulParamsForFurtherProductListingApi,
      }) as any
    );
    const requestParams = {
      query: query,
      token: TokenFromStore?.token,
    };
    dispatch(FiltersThunk(requestParams) as any);
    if (CONSTANTS.ENABLE_TOGGLE_PRODUCT_LISTING_VIEW) {
      // dispatch(setProductsView("list-view"));
    } else {
      dispatch(setProductsView(CONSTANTS.PRODUCT_LISTING_VIEW));
    }
    if (router.query.hasOwnProperty("filter")) {
      const encodedFilterString: any = router.query.filter;
      if (encodedFilterString !== undefined) {
        const decodedFilterString = decodeURIComponent(encodedFilterString);
        const decodedFilters = JSON.parse(decodedFilterString);
        console.log("decoded filters", decodedFilters);
        setSelectedFilters([...decodedFilters]);
      }
    } else {
      setSelectedFilters([]);
    }
  }, [dispatch, query]);
  console.log(router,"routers")
  useEffect(() => {
    setToggleProductListView(product_view_slice_from_redux?.view);
  }, [product_view_slice_from_redux?.view]);
  useEffect(() => {
    // console.log("cube in hook",prod)
    switch (product_listing_state_from_redux?.loading) {
      case "pending":
        setProductsLoading(true);
        setProductListingData([]);
        setProductListTotalCount(0);
        break;
      case "succeeded":
        if (product_listing_state_from_redux?.productListData?.length > 0) {
          handleProductListingForLoadMore();
          setProductListTotalCount(
            product_listing_state_from_redux.productsTotalCount
          );
        } else {
          setProductListingData([]);
          setProductListTotalCount(0);
        }
        setProductsLoading(false);
        break;
      case "failed":
        setProductsLoading(false);
        setProductListingData([]);
        setProductListTotalCount(0);
        break;
    }
    switch (filters_state_from_redux?.loading) {
      case "pending":
        setFiltersLoading(true);
        setFiltersData([]);
        break;
      case "succeeded":
        setFiltersData([...filters_state_from_redux.filtersData]);
        setFiltersLoading(false);
        break;
      case "failed":
        setFiltersData([]);
        setFiltersLoading(false);
        break;
    }
    setToggleProductListView(product_view_slice_from_redux?.view);
  }, [product_listing_state_from_redux, filters_state_from_redux]);
  console.log(query, "router");
  return {
    productsLoading,
    productListingData,
    productListTotalCount,
    filtersLoading,
    filtersData,
    selectedFilters,
    handleApplyFilters,
    checkFiltersValue,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    handlePaginationBtn,
    currency_state_from_redux,
    query
  };
};
export default useProductListing;
