import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlistUser,
  wishlist_state,
} from "../../store/slices/wishlist-slice/wishlist-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useWishlist = () => {
  const dispatch = useDispatch();

  const wishlistStoreData: any = useSelector(wishlist_state);
  const TokenFromStore: any = useSelector(get_access_token);

  console.log("wishlist hookval", wishlistStoreData);
  const [Loadings, setLoadings] = useState("");
  const [wishlistData, setWishlistData] = useState<any>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    const wishListRequest = {
      getWishlist: true,
      deleteWishlist: false,
      addTowishlist: false,
      token: TokenFromStore?.token,
    };
    dispatch(fetchWishlistUser(wishListRequest));
  }, []);

  useEffect(() => {
    setWishlistCount(wishlistStoreData?.user?.wishlist_count);
    setLoadings(wishlistStoreData?.isLoading);
    if (wishlistStoreData?.user?.data?.length > 0) {
      setWishlistData([...wishlistStoreData?.user?.data]);
    } else {
      if (wishlistStoreData?.user?.data?.length === 0) {
        setWishlistData([]);
      }
    }
    // setWishlistProduct([wishlistStoreData?.wishProduct]);
  }, [wishlistStoreData]);

  console.log("wishlist count in hook LOADING", Loadings);
  console.log("wishlistdata in hook end", wishlistData);
  // console.log("wishlistProduct in hook end", wishlistProduct);

  return { wishlistData, wishlistCount, Loadings };
};

export default useWishlist;
