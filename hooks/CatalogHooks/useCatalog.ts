import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CreateCatalogAPI } from '../../services/api/catalog-apis/create-catalog-api';
import { DeleteCatalogAPI } from '../../services/api/catalog-apis/delete-catalog-api';
import { default as GetCatalogListAPI } from '../../services/api/catalog-apis/get-catalog-list-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { setCatalogListSlice } from '../../store/slices/catalog-slice/catalog-local-slice';
import useHandleStateUpdate from '../GeneralHooks/handle-state-update-hook';

const useCatalog = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const dispatch = useDispatch();
  const [catalogName, setCatalogName] = useState<string>('');
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
        const catalogItems = catalogListData?.data?.message?.data.map((item: any) => ({
          name: item.name,
          slug: item.slug,
        }));
        dispatch(setCatalogListSlice(catalogItems));
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
  const handleSubmitCatalogName = async () => {
    const params = {
      catalog_name: catalogName,
      catalog_access_level: 'Public',
    };
    if (catalogName !== '') {
      const newCatalog = await CreateCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
      if (newCatalog?.data?.message?.msg === 'success') {
        toast.success('Catalog created sucessfully');
        setTimeout(() => {
          fetchCatalogListData();
        }, 1000);
        setCatalogName('');
      } else {
        toast.error(newCatalog?.message?.error);
      }
    } else {
      toast.error('Please enter valid catalog name');
    }
  };
  const handleDeleteCatalog = async (catalog: any) => {
    const params = {
      catalog_name: catalog,
    };
    const deleteCatalogs: any = await DeleteCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (deleteCatalogs?.data?.message?.msg === 'success') {
      toast.success('Catalog Deleted Successfuly');
      setTimeout(() => {
        fetchCatalogListData();
      }, 1000);
    } else {
      toast.error('Error in deleting the catalog');
    }
  };

  useEffect(() => {
    fetchCatalogListData();
  }, []);

  return {
    handleCatalogName,
    handleSubmitCatalogName,
    catalogList,
    handleDeleteCatalog,
    isLoading,
  };
};

export default useCatalog;
