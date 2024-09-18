import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddItemToCatalogAPI } from '../../services/api/catalog-apis/add-item-to-catalog-api';
import { DeleteCatalogItemAPI } from '../../services/api/catalog-apis/delete-catalog-item-api';
import { CONSTANTS } from '../../services/config/app-config';
import { get_access_token } from '../../store/slices/auth/token-login-slice';

const useCatalogFunctions = () => {
  const { SUMMIT_APP_CONFIG }: any = CONSTANTS;
  const tokenFromStore = useSelector(get_access_token);
  const handleAddProductToCatalog = async (catalogname: any, itemName: any) => {
    const params = {
      catalog_name: catalogname,
      item: itemName,
    };
    const getCatalogList = await AddItemToCatalogAPI(SUMMIT_APP_CONFIG, params, tokenFromStore?.token);
    if (getCatalogList.data.message.msg === 'success') {
      toast.success(getCatalogList?.data?.message?.data);
    } else {
      toast.error('Error in adding product to catalog');
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
    } else {
      toast.error('Error in deleting the catalog item');
    }
  };
  return { handleAddProductToCatalog, handleDeleteCatalogItem };
};

export default useCatalogFunctions;
