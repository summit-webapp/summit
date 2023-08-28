import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDisplayTagHooks from "../../HomePageHooks/DisplayTagHooks";

const useLinguisticsAndForexHook = () => {
  const dispatch = useDispatch();

  const { fetchDisplayTagsDataFunction } = useDisplayTagHooks();

  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState("");

  const handleCurrencyValueChange = (curr: any) => {
    fetchDisplayTagsDataFunction(curr);
    setSelectedCurrencyValue(curr);
  };

  return {
    handleCurrencyValueChange,
  };
};

export default useLinguisticsAndForexHook;
