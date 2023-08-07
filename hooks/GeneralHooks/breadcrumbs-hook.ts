import { useDispatch, useSelector } from "react-redux";
import {
  breadcrumbs_state,
  fetchBreadCrumbs,
} from "../../store/slices/general_slices/breadcrumbs-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const UseBreadCrumbsHook = () => {
  const router = useRouter();
  const { query }: any = useRouter();
  const dispatch = useDispatch();
  const [breadCrumbData, setBreadCrumbData] = useState([]);
  const breadCrumbs_data_from_store = useSelector(breadcrumbs_state);
  console.log("breadcrumb data from store", breadCrumbs_data_from_store);
  const TokenFromStore: any = useSelector(get_access_token)

  const url = router.asPath;
  const splitURL = url.split("/").join(",").split("%20").join(",").split(",");
  // console.log("breadcrumb router", splitURL);

  useEffect(() => {
    console.log("fetch breadcrumb")
    const requestParams = {
      url: splitURL,
      token: TokenFromStore?.token
    }
    dispatch(fetchBreadCrumbs(requestParams));
  }, [dispatch,query]);

  useEffect(() => {
    if (breadCrumbs_data_from_store?.data?.length > 0) {
      setBreadCrumbData(breadCrumbs_data_from_store?.data);
    } else {
      setBreadCrumbData([]);
    }
  }, [breadCrumbs_data_from_store]);

  return { breadCrumbData };
};

export default UseBreadCrumbsHook;
