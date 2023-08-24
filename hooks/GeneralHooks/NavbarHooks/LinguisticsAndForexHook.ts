import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currency_selector_state,
  setCurrencyValue,
} from "../../../store/slices/general_slices/multi-currency-slice";

const useLinguisticsAndForexHook = () => {
  const dispatch = useDispatch();

  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState("");

  const handleCurrencyValueChange = (curr: any) => {
    dispatch(setCurrencyValue(curr));
    setSelectedCurrencyValue(curr);
  };

  return {
    handleCurrencyValueChange,
  };
};

export default useLinguisticsAndForexHook;
