import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSingleItem,
  clearAllDataAddedToQuickOrderList,
  fetchQuickOrder,
  quick_order_state,
} from "../../../store/slices/general_slices/quick-order-slice";
import { get_access_token } from "../../../store/slices/auth/token-login-slice";
import { currency_selector_state } from "../../../store/slices/general_slices/multi-currency-slice";

export const useQuickOrder = () => {
  const dispatch = useDispatch();
  const quickOrderDataFromStore: any = useSelector(quick_order_state);
  const TokenFromStore: any = useSelector(get_access_token);
  const currency_state_from_redux: any = useSelector(currency_selector_state);

  const token_value = TokenFromStore?.token;
  const selected_currency = currency_state_from_redux?.selected_currency;

  const [partNumberInputField, setPartNumberInputField] = useState<string>("");
  const [inputFieldCount, setInputFieldCount] = useState<number>(1);

  const [partNumbersData, setPartNumbersData] = useState<any>([]);
  const [minQty, setMinQty] = useState<any>([]);

  const [ifInputEmptyErr, setIfInputEmptyErr] = useState<boolean>(false);
  const [ifPartNumberExistsErr, setIfPartNumberExistsErr] =
    useState<boolean>(false);

  const [itemNotFoundErr, setItemNotFoundErr] = useState(false);
  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      if (partNumberInputField === "") {
        setIfInputEmptyErr(true);
        setTimeout(() => {
          setIfInputEmptyErr(false);
        }, 2000);
      } else {
        if (false) {
          setIfPartNumberExistsErr(true);
          setTimeout(() => {
            setIfPartNumberExistsErr(false);
          }, 3000);
        } else {
          setInputFieldCount(inputFieldCount + 1);
          const requestParams = {
            partNumberInputField: partNumberInputField,
            token: TokenFromStore?.token
          }
          dispatch(fetchQuickOrder(requestParams));
          const existingHsnCode = partNumbersData.filter(
            (element: any, i: any) =>
              element.oem_part_number === partNumberInputField
          );
          // console.log(existingHsnCode, "newval12");
          if (existingHsnCode.length > 0) {
            setIfPartNumberExistsErr(true);
            setTimeout(() => {
              setIfPartNumberExistsErr(false);
            }, 3000);
          }
        }
      }
    }

  };
  // console.log(quickOrderDataFromStore, "quick_order_state");
  const handleClearReduxStore = () => {
    dispatch(clearAllDataAddedToQuickOrderList());
  };

  const handleAddToCartQuickOrder = () => { };

  useEffect(() => {
    // console.log("enter data from store", quickOrderDataFromStore);
    // dispatch(emptyStore());
    if (quickOrderDataFromStore?.error === "Data Not Found") {
      setItemNotFoundErr(true);
      setTimeout(() => {
        setItemNotFoundErr(false);
      }, 2000);
    }
    if (quickOrderDataFromStore?.items?.length > 0) {
      setPartNumbersData([...quickOrderDataFromStore?.items]);
      let storeMinQty: any = [];
      quickOrderDataFromStore?.items?.map((eachProduct: any) =>
        storeMinQty.push({
          item_code: eachProduct.name,
          minQuantity: eachProduct.min_order_qty,
        })
      );
      setMinQty(storeMinQty);
    } else {
      setPartNumbersData([]);
    }
  }, [quickOrderDataFromStore]);
  // console.log(partNumbersData, "partNumbersData");
  return {
    removeSingleItem,
    partNumbersData,
    setPartNumbersData,
    token_value,
    selected_currency,
    minQty,
    inputFieldCount,
    ifInputEmptyErr,
    ifPartNumberExistsErr,
    itemNotFoundErr,
    partNumberInputField,
    setPartNumberInputField,
    handleKeyDown,
    handleClearReduxStore,
    handleAddToCartQuickOrder,
  };
};
