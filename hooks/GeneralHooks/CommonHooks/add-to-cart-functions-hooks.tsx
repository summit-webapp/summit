import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profileData_state } from '../../../store/slices/general_slices/profile-page-slice';
import AddToCartApi from '../../../services/api/cart-page-api/add-to-cart-api';
import { showToast } from '../../../components/ToastNotificationNew';
import { updateAccessToken } from '../../../store/slices/auth/token-login-slice';
import { fetchCartListing } from '../../../store/slices/cart-listing-page-slice/cart-listing-slice';
import { hideToast } from '../../../store/slices/general_slices/toast_notification_slice';

const useAddToCartHook = (productID:any, currency_state_from_redux:any,token:any) => {
    const [productQuantity, setProductQuantity] = useState<any>(1);
    const [stockAvailabilityTextChanges, setstockAvailabilityTextChanges] = useState(false);
    const profileData: any = useSelector(profileData_state);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    let partyName: any;


    const handleQuantity = (val: any) => {
        const inputValue = parseInt(val);
        if (isNaN(inputValue)) {
            setProductQuantity('');
        } else {
            setProductQuantity(inputValue);
        }
      };
      const handleQuantityIncrement = () => {
        setProductQuantity(parseInt(productQuantity + 1));
        setstockAvailabilityTextChanges(true);

        setTimeout(() => {
            setstockAvailabilityTextChanges(false);
        }, 600);
      };
      const handleQuantityDecrement = () => {
        setProductQuantity((prevQty: number) => (prevQty > 1 ? prevQty - 1 : 1));
        setstockAvailabilityTextChanges(true);

        setTimeout(() => {
            setstockAvailabilityTextChanges(false);
        }, 600);
      };

      
      const handleAddCartB2c = async () => {
        const addCartData = [];
        addCartData.push({
            item_code: productID ,
            quantity: productQuantity,
        });

        if (profileData?.partyName !== "") {
            if (Object?.keys(profileData?.partyName)?.length > 0) {
                partyName = profileData?.partyName;
            }
        } else {
            partyName = "Guest";
        }

        let AddToCartProductRes: any = await AddToCartApi(
            addCartData,
            currency_state_from_redux?.selected_currency_value,
            token,
            partyName
        );
        if (AddToCartProductRes.msg === "success") {
            // dispatch(successmsg("Item Added to cart"));

            showToast("Item Added to cart", "success");
            setIsLoading(true);
            setTimeout(() => {
                // Stop the loader after 2 seconds (adjust the time as needed)
                setIsLoading(false);
                // Add your actual functionality here (e.g., adding to the cart)
                // ...
            }, 2000);

            if (AddToCartProductRes?.data?.access_token !== null) {
                dispatch(updateAccessToken(AddToCartProductRes?.data?.access_token));
                localStorage.setItem(
                    "guest",
                    AddToCartProductRes?.data?.access_token
                );
                console.log("token api res", AddToCartProductRes);
                if (AddToCartProductRes?.data?.access_token !== null) {
                    console.log("token from api");
                    dispatch(fetchCartListing(AddToCartProductRes?.data?.access_token));
                }
            } else {
                dispatch(fetchCartListing(token));
            }
            setTimeout(() => {
                dispatch(hideToast());
            }, 1200);
        } else {
            setIsLoading(false);
            showToast("Failed to Add to cart", "error");
        }

    };
  return {
    productQuantity,
    setProductQuantity,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    handleAddCartB2c,
    isLoading,
    stockAvailabilityTextChanges
  }
   
}

export default useAddToCartHook
