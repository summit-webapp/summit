import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  display_tags,
  fetchDisplayTags,
} from "../../store/slices/home_page_slice/home-display-tag-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useDisplayTagHooks = () => {
  const dispatch = useDispatch();
  const [newArrivalTagListingOfProducts, setNewArrivalTagListingOfProducts] =
    useState<any>([]);
  const [
    specialOfferTagListingOfProducts,
    setSpecialOfferTagListingOfProducts,
  ] = useState<any>([]);
  const [bestSellerTagListingOfProducts, setBestSellerTagListingOfProducts] =
    useState<any>([]);

  const [allTagsData, setAllTagsData] = useState<any>([]);

  const displayTagList: any = useSelector(display_tags);
  console.log(displayTagList, "displayTagList");

  const TokenFromStore: any = useSelector(get_access_token)


  useEffect(() => {
    dispatch(fetchDisplayTags(TokenFromStore?.token));
  }, []);

  useEffect(() => {
    console.log("display tag in hook", displayTagList);
    if (displayTagList?.tagData?.length > 0) {
      setAllTagsData([...displayTagList.tagData]);
    } else {
      setAllTagsData([]);
    }
  }, [displayTagList]);

  return {
    allTagsData,
  };
};

export default useDisplayTagHooks;
