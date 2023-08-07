import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomeBannerDataFromAPI,
  home_banner_selector_state,
} from "../../store/slices/home_page_slice/home-banners-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useHomeBanner = () => {
  const dispatch = useDispatch();
  const homeBannerReduxStoreData: any = useSelector(home_banner_selector_state);

  const TokenFromStore: any = useSelector(get_access_token)

  const [homeBannerData, setHomeBannerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<string>("");

  useEffect(() => {
    dispatch(fetchHomeBannerDataFromAPI(TokenFromStore?.token) as any);
  }, []);

  useEffect(() => {
    console.log("home banner selector in hook", homeBannerReduxStoreData);
    console.log("home banner selector in hook loading", homeBannerReduxStoreData?.loading);
    if (homeBannerReduxStoreData?.loading === "pending") {
      setIsLoading(homeBannerReduxStoreData?.loading);
    }
    else if (
      homeBannerReduxStoreData?.loading === "succeeded" &&
      homeBannerReduxStoreData?.homeBannerData?.data?.length
    ) {
      // BELOW CODE IS TO SORT HOME BANNER DATA AND STORE IN THE STATE
      Object.freeze(homeBannerReduxStoreData?.homeBannerData?.data);
      const sortHomeBannerData = [...homeBannerReduxStoreData?.homeBannerData?.data];
      setHomeBannerData(
        sortHomeBannerData?.sort(function (a: any, b: any) {
          return a.sequence - b.sequence;
        })
      );
      setIsLoading(homeBannerReduxStoreData?.loading);
    } else {
      setHomeBannerData([]);
      setIsLoading(homeBannerReduxStoreData?.loading);
    }
  }, [homeBannerReduxStoreData]);

  return { homeBannerData, isLoading };
};
export default useHomeBanner;
