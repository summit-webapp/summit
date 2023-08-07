import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  brand_state,
} from "../../store/slices/home_page_slice/home-brand-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
const useHomeTopBrand = () => {
  const dispatch = useDispatch();
  const [brandListing, setBrandListing] = useState<any>([]);
  const brandList: any = useSelector(brand_state);
  const TokenFromStore: any = useSelector(get_access_token)

  useEffect(() => {
    dispatch(fetchBrands(TokenFromStore?.token));
  }, []);

  useEffect(() => {
    if (brandList.isLoading === "succeeded" && brandList?.items?.length > 0) {
      setBrandListing(
        [...brandList?.items].sort((a: any, b: any) => a.seq - b.seq)
      );
    } else {
      setBrandListing([]);
    }
  }, [brandList]);

  console.log(brandListing, "brandListing");

  return { brandListing };
};

export default useHomeTopBrand;
