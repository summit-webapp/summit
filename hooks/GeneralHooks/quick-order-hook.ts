import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllDataAddedToQuickOrderList,
  fetchQuickOrder,
  quick_order_state,
} from "../../store/slices/general_slices/quick-order-slice";
import { QuickOrderAddToCart } from "../../services/api/cart-page-api/add-to-cart-api";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

export const useQuickOrder = () => {
  const dispatch = useDispatch();

  const quick_order_redux_state: any = useSelector(quick_order_state);
  const TokenFromStore: any = useSelector(get_access_token)

  const [partNumberInputField, setPartNumberInputField] = useState<string>("");
  const [quickOrderPartNumbersData, setQuickOrderPartNumbersData] = useState<any>([]);

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      if (partNumberInputField === "") {
        // setIfInputEmptyErr(true);
        // setTimeout(() => {
        //   setIfInputEmptyErr(false);
        // }, 2000);
      } else {
        if (false) {
          //   setIfPartNumberExistsErr(true);
          //   setTimeout(() => {
          //     setIfPartNumberExistsErr(false);
          //   }, 3000);
        } else {
          //   setInputFieldCount(inputFieldCount + 1);
          const requestParams = {
            partNumberInputField: partNumberInputField,
            token: TokenFromStore?.token
          }
          dispatch(fetchQuickOrder(requestParams));
        }
      }
    } else {
      //   dispatch(emptyStore());
    }
  };

  const handleClearReduxStore = () => {
    dispatch(clearAllDataAddedToQuickOrderList());
  };

  const handleInputChange = (e: any, index: any) => {
    const { value } = e.target;
    console.log("enter min val", value);

    setQuickOrderPartNumbersData((prevState: any) => {
      const updatedPartNumbersData = [...quickOrderPartNumbersData];
      updatedPartNumbersData[index] = {
        ...updatedPartNumbersData[index],
        min_order_qty: value === '0' || value === "" ? '' : Number(value),
      };
      return updatedPartNumbersData;
    });
  }

  const handleAddCartQuickOrder = async () => {
    const add_to_cart_data_obj = quickOrderPartNumbersData?.map((quickOrderPartNumber: any) => {
      return {
        item_code: quickOrderPartNumber?.name, quantity: quickOrderPartNumber?.min_order_qty, token: TokenFromStore?.token
      }
    })
    console.log("uick order add cart", add_to_cart_data_obj);

    const quickOrderAddCart = await QuickOrderAddToCart(add_to_cart_data_obj);
    dispatch(clearAllDataAddedToQuickOrderList());

  }

  useEffect(() => {
    setQuickOrderPartNumbersData([...quick_order_redux_state?.items]);
  }, [quick_order_redux_state]);

  return {
    partNumberInputField,
    setPartNumberInputField,
    handleKeyDown,
    handleClearReduxStore,
    quickOrderPartNumbersData,
    handleInputChange,
    handleAddCartQuickOrder
  };
};
