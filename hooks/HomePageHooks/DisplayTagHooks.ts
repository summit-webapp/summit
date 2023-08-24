import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  display_tags,
  fetchDisplayTags,
  testReducer,
} from "../../store/slices/home_page_slice/home-display-tag-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { useRouter } from "next/router";
import { RootState } from "../../store/root-reducer";

const useDisplayTagHooks = () => {
  const dispatch = useDispatch();

  const { query }: any = useRouter();

  const currency_state_from_redux: any = useSelector(currency_selector_state);

  const [allTagsData, setAllTagsData] = useState<any>([]);

  const displayTagList: any = useSelector(display_tags);

  const TokenFromStore: any = useSelector(get_access_token);

  useEffect(() => {
    // console.log("multi currency in reducer in tag hook",currency_state_from_redux?.selected_currency_value);
    dispatch(
      fetchDisplayTags({
        token: TokenFromStore?.token,
        currencyValue: currency_state_from_redux?.selected_currency_value,
      })
    );

  }, [currency_state_from_redux?.selected_currency_value]);

  useEffect(() => {
    // console.log("display tag in hook", displayTagList);
    if (displayTagList?.tagData?.length > 0) {
      setAllTagsData([...displayTagList.tagData]);
    } else {
      setAllTagsData([]);
    }
  }, [displayTagList]);

  return {
    allTagsData
  };
};

export default useDisplayTagHooks;
