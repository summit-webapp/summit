import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultiLanguagesThunkAPI, multiLanguageDataFromStore } from '../../store/slices/general_slices/multilang-slice';
import { SelectedFilterLangDataFromStore, SelectedLangData } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';
import { useRouter } from 'next/router';

const useMultilangHook = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const MultiLanguageFromStore = useSelector(multiLanguageDataFromStore);
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  const SelectedLangDataFromStore = useSelector(SelectedFilterLangDataFromStore);

  const [multiLanguagesData, SetMultiLanguagesData] = useState<any>([]);
  const [selectedLang, setSelectedLang] = useState<any>('en');
  const TokenFromStore: any = useSelector(get_access_token);
  const multiLangParams = {
    appConfig: SUMMIT_APP_CONFIG,
    token: TokenFromStore?.token,
  };
  useEffect(() => {
    // Retrieve the selected language from localStorage on component mount
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      setSelectedLang(storedLang);
    } else {
      // If no language is stored in localStorage, set the default language to English
      setSelectedLang('en');
    }
    dispatch(fetchMultiLanguagesThunkAPI(multiLangParams) as any);
  }, []);

  useEffect(() => {
    if (Object.keys(MultiLanguageFromStore)?.length > 0) {
      SetMultiLanguagesData(MultiLanguageFromStore?.languageData);
    }
  }, [MultiLanguageFromStore]);

  const handleLanguageChange = (lang: any) => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    setSelectedLang(lang);

    localStorage.setItem('selectedLanguage', lang);
    const query = { ...router?.query, lang };
    router.push({ pathname: router?.pathname, query }, undefined, { shallow: true });
  };

  useEffect(() => {
    const params = {
      multilanguageData: MultiLanguageFromStore?.languageData,
      selectedLanguage: selectedLang,
    };
    dispatch(SelectedLangData(params) as any);
  }, [MultiLanguageFromStore, selectedLang]);

  return {
    setSelectedLang,
    selectedLang,
    handleLanguageChange,
    multiLanguagesData,
  };
};

export default useMultilangHook;
