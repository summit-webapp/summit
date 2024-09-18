import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CreateCatalogAPI } from '../../services/api/catalog-apis/create-catalog-api';
import { DeleteCatalogAPI } from '../../services/api/catalog-apis/delete-catalog-api';
import GetCatalogItemListAPI from '../../services/api/catalog-apis/get-catalog-item-list-api';
import { default as GetCatalogListAPI } from '../../services/api/catalog-apis/get-catalog-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';
import { setCatalogListSlice } from '../../store/slices/catalog-slice/catalog-local-slice';

const useCatalog = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const dispatch = useDispatch();
  const [catalogName, setCatalogName] = useState<string>('');
  const [catalogListItem, setCatalogListItem] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const tokenFromStore = useSelector(get_access_token);
  const { isLoading, setIsLoading, errorMessage, setErrMessage }: any = useHandleStateUpdate();
  const handleCatalogName = (e: any) => {
    setCatalogName(e?.target?.value);
  };
  const fetchCatalogListData: any = async () => {
    setIsLoading(true);
    try {
      let catalogListData: any = await GetCatalogListAPI(SUMMIT_APP_CONFIG, tokenFromStore.token);
      if (catalogListData?.status === 200 && catalogListData?.data?.message?.msg === 'success') {
        setCatalogList(catalogListData?.data?.message?.data);
        const catalogNames = catalogListData?.data?.message?.data.map((item: any) => item.name);
        console.log(catalogNames, 'catalog');
        dispatch(setCatalogListSlice(catalogNames));
        setErrMessage('');
      } else {
        setCatalogList([]);
        dispatch(setCatalogListSlice([]));
        setErrMessage(catalogListData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch catalog list data.');
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCatalogItemData: any = async (catalog: any) => {
    const params = { catalog_slug: catalog };
    setIsLoading(true);
    try {
      let catalogItemData: any = await GetCatalogItemListAPI(SUMMIT_APP_CONFIG, params, tokenFromStore.token);
      if (catalogItemData?.status === 200 && catalogItemData?.data?.message?.msg === 'success') {
        setCatalogListItem(catalogItemData?.data?.message?.data);
      } else {
        setCatalogListItem([]);
        setErrMessage(catalogItemData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch catalog item listing data.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCatalogListData();
    fetchCatalogItemData();
  }, []);
  const handleSubmitCatalogName = async () => {
    const params = {
      catalog_name: catalogName,
      catalog_access_level: 'Public',
    };
    const newCatalog = await CreateCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (newCatalog?.message?.msg === 'success') {
      toast.success('Catalog created sucessfully');
      fetchCatalogListData();
      setCatalogName('');
    } else {
      toast.error(newCatalog?.message?.error);
    }
  };
  const handleDeleteCatalog = async (catalog: any) => {
    const params = {
      catalog_name: catalog,
    };
    const deleteCatalogs = await DeleteCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (deleteCatalogs?.message?.msg === 'success') {
      toast.success('Catalog Deleted Successfuly');
      setTimeout(() => {
        fetchCatalogListData;
      }, 1000);
    } else {
      toast.error('Error in deleting the catalog');
    }
  };

  return {
    handleCatalogName,
    handleSubmitCatalogName,
    catalogListItem,
    catalogList,
    handleDeleteCatalog,
    isLoading,
  };
};

export default useCatalog;
