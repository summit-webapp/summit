import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultiLanguagesThunkAPI, multiLanguageDataFromStore } from '../../store/slices/general_slices/multilang-slice';
import { SelectedFilterLangDataFromStore, SelectedLangData } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useMultilangHook = () => {
  const dispatch = useDispatch();
  const MultiLanguageFromStore = useSelector(multiLanguageDataFromStore);

  const SelectedLangDataFromStore = useSelector(SelectedFilterLangDataFromStore);

  const [multiLanguagesData, SetMultiLanguagesData] = useState<any>([]);
  const [selectedLang, setSelectedLang] = useState<any>('en');
  const TokenFromStore: any = useSelector(get_access_token);

  useEffect(() => {
    // Retrieve the selected language from localStorage on component mount
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      setSelectedLang(storedLang);
    } else {
      // If no language is stored in localStorage, set the default language to English
      setSelectedLang('en');
    }
  }, []);

  // useEffect(() => {
  //   dispatch(fetchMultiLanguagesThunkAPI(TokenFromStore?.token) as any);
  // }, []);

  useEffect(() => {
    // console.log("check data of server obj - hook", MultiLanguageFromStore);
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      SetMultiLanguagesData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  const handleLanguageChange = (lang: any) => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    setSelectedLang(lang);

    localStorage.setItem('selectedLanguage', lang);
  };

  useEffect(() => {
    const params = {
      multilanguageData: MultiLanguageFromStore?.languageData,
      selectedLanguage: selectedLang,
    };
    // console.log("params", params);
    dispatch(SelectedLangData(params) as any);
  }, [MultiLanguageFromStore, selectedLang]);
  console.log();
  return {
    setSelectedLang,
    selectedLang,
    handleLanguageChange,
    multiLanguagesData,
  };
};

export default useMultilangHook;
