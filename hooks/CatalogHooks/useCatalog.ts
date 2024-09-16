import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddItemToCatalogAPI } from '../../services/api/catalog-apis/add-item-to-catalog-api';
import { CreateCatalogAPI } from '../../services/api/catalog-apis/create-catalog-api';
import { DeleteCatalogAPI } from '../../services/api/catalog-apis/delete-catalog-api';
import { DeleteCatalogItemAPI } from '../../services/api/catalog-apis/delete-catalog-item-api';
import GetCatalogItemListAPI from '../../services/api/catalog-apis/get-catalog-item-list-api';
import { default as fetchCatalogListAPI, default as GetCatalogListAPI } from '../../services/api/catalog-apis/get-catalog-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useCatalog = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const [catalogName, setCatalogName] = useState<string>('');
  const [catalogListItem, setCatalogListItem] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
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
        if (Object.keys(catalogListData?.data?.message?.data).length !== 0) {
          setCatalogList(catalogListData?.data?.message?.data);
        } else {
          setCatalogList([]);
        }
      } else {
        setCatalogList([]);
        setErrMessage(catalogListData?.data?.message?.error);
      }
    } catch (error) {
      setErrMessage('Failed to fetch catalog list data.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCatalogListData();
  }, []);
  const fetchCatalogItemData: any = async (catalog: any) => {
    const params = { catalog_slug: catalog };
    setIsLoading(true);
    try {
      let catalogItemData: any = await GetCatalogItemListAPI(SUMMIT_APP_CONFIG, params, tokenFromStore.token);
      if (catalogItemData?.status === 200 && catalogItemData?.data?.message?.msg === 'success') {
        if (Object.keys(catalogItemData?.data?.message?.data).length !== 0) {
          setCatalogListItem(catalogItemData?.data?.message?.data);
        } else {
          setCatalogListItem([]);
        }
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
  const handleDeleteCatalogItem = async (catalog: any, name: string) => {
    const params = {
      catalog_name: catalog,
      item: name,
    };
    const deleteCatalogItem = await DeleteCatalogItemAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (deleteCatalogItem?.message?.msg === 'success') {
      toast.success('Catalog Item Deleted Successfuly');
      setTimeout(() => {
        fetchCatalogListData;
      }, 1000);
    } else {
      toast.error('Error in deleting the catalog item');
    }
  };
  const handleAddProduct = async (catalogname: any, name: any) => {
    const params = {
      catalog_name: catalogname,
      item: name,
    };
    const getCatalogList = await AddItemToCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (getCatalogList.data.message.msg === 'success') {
      toast.success('Item Added To Catalog Successfuly');

      setTimeout(() => {
        fetchCatalogListAPI;
      }, 1000);
    } else {
      toast.error('Error in adding product to catalog');
    }
  };
  return {
    handleCatalogName,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
    handleAddProduct,
    currency_state_from_redux,
  };
};

export default useCatalog;
