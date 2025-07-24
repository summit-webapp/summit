import { useEffect } from 'react';
import i18n from 'i18next';
import { useSelector } from 'react-redux';
import { SelectedLangFromStore } from '../../store/slices/general_slices/multilingual-slice';

const useLanguageHandler = () => {
  const selectedLanguage = useSelector(SelectedLangFromStore)?.selectedLanguage;

  useEffect(() => {
    if (typeof selectedLanguage === 'string' && selectedLanguage.length > 0) {
      i18n.changeLanguage(selectedLanguage).catch((err) => {});
    }
  }, [selectedLanguage]);
};

export default useLanguageHandler;
