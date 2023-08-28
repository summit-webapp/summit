import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMultiLanguagesThunkAPI,
  multiLanguageDataFromStore,
} from "../../store/slices/general_slices/multilang-slice";
import {
  SelectedFilterLangDataFromStore,
  SelectedLangData,
} from "../../store/slices/general_slices/selected-multilanguage-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const useMultilangHook = () => {
  const dispatch = useDispatch();
  const MultiLanguageFromStore = useSelector(multiLanguageDataFromStore);

  const SelectedLangDataFromStore = useSelector(
    SelectedFilterLangDataFromStore
  );

  // console.log("MultiLanguageFromStore hoooook", MultiLanguageFromStore);
  const [multiLanguagesData, SetMultiLanguagesData] = useState<any>([]);
  const [selectedLang, setSelectedLang] = useState<any>("en");
  const TokenFromStore: any = useSelector(get_access_token);

  // useEffect(() => {
  //   dispatch(fetchMultiLanguagesThunkAPI(TokenFromStore?.token) as any);
  // }, []);

  useEffect(() => {
    // console.log("check data of server obj - hook", MultiLanguageFromStore);
    if (Object.keys(MultiLanguageFromStore)?.length > 0) {
      SetMultiLanguagesData(MultiLanguageFromStore?.languageData);
    }
  }, [MultiLanguageFromStore]);

  const handleLanguageChange = (lang: any) => {
    console.log("selected lang", lang);
    setSelectedLang(lang);
  };

  useEffect(() => {
    const params = {
      multilanguageData: MultiLanguageFromStore?.languageData,
      selectedLanguage: selectedLang,
    };
    // console.log("params", params);
    dispatch(SelectedLangData(params) as any);
  }, [MultiLanguageFromStore, selectedLang]);

  // console.log(
  //   "MultiLanguageFromStore hoooook",
  //   multiLanguagesData,
  //   selectedLang
  // );

  return {
    setSelectedLang,
    selectedLang,
    handleLanguageChange,
    multiLanguagesData,
  };
};

export default useMultilangHook;
