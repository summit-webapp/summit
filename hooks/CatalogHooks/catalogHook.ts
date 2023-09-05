import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import CreateCatalog from "../../services/api/product-catalog-api/create-catalog-api";
import {
  catalog_summary_state,
  fetchCatalogList,
} from "../../store/slices/catalog-page-slice/get-catalog-slice";
import deleteCatalog from "../../services/api/product-catalog-api/delete-catalog-api";
import AddProductToCatalogList from "../../services/api/product-catalog-api/put-product-to-catalog-api";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../../store/slices/general_slices/toast_notification_slice";
import { showToast } from "../../components/ToastNotificationNew";

const useCatalogHook = () => {
  const getcatalogList_reduxList: any = useSelector(catalog_summary_state);
  const [catalogName, setCatalogName] = useState<string>("");
  const [catalogSucessMsg, setCatalogSucessMsg] = useState("");
  const [catalogListItem, setCatalogListItem] = useState([]);
  const [loading, setLoading] = useState("");
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const tokens = useSelector(get_access_token);
  const dispatch = useDispatch();
  const token = tokens.token;
  console.log(getcatalogList_reduxList, "tokens");
  const handleChange = (e: any) => {
    setCatalogName(e?.target?.value);
  };
  const handleSubmitCatalogName = async () => {
    const newCatalog = await CreateCatalog(catalogName, token);

    setCatalogSucessMsg(newCatalog?.message?.msg);
    if (newCatalog?.message?.msg === "success") {
      showToast("Catalog created sucessfully", "success");

      dispatch(fetchCatalogList(token));
      setCatalogName("");
    } else {
      showToast(newCatalog?.message?.error, "error");
    }
  };

  useEffect(() => {
    dispatch(fetchCatalogList(token));
  }, []);

  useEffect(() => {
    setLoading(getcatalogList_reduxList?.isLoading);
    if (
      getcatalogList_reduxList.isLoading === "succeeded" &&
      getcatalogList_reduxList?.data?.length > 0
    ) {
      setCatalogListItem(getcatalogList_reduxList?.data);
    } else {
      setCatalogListItem([]);
    }
  }, [getcatalogList_reduxList, catalogSucessMsg]);
  console.log(catalogListItem, "catalogListItem");
  const handleDeleteCatalog = async (catalog: any) => {
    const deleteCatalogs = await deleteCatalog(catalog, token);
    if (deleteCatalogs?.message?.msg === "success") {
      showToast("Catalog Deleted Successfuly", "success");

      setTimeout(() => {
        dispatch(fetchCatalogList(token));
      }, 1000);
    } else {
      showToast("Error in deleting the catalog", "error");
    }
  };
  const handleAddProduct = async (catalogname: any, name: any) => {
    console.log(catalogname, name, "CatalogName");
    // const CatalogName = catalogname.replace(/-/g, " ");
    const productdata = {
      catalogNames: catalogname,
      ItemCode: name,
      tokens: token,
    };
    const getCatalogList = await AddProductToCatalogList(productdata);
    if (getCatalogList.data.message.msg === "success") {
      showToast("Item Added To Catalog Successfuly", "success");

      setTimeout(() => {
        dispatch(fetchCatalogList(token));
      }, 1000);
    } else {
      showToast("Error in adding product to catalog", "error");
    }
  };
  console.log(loading, "getCatalogList");
  return {
    handleChange,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
    handleAddProduct,
    currency_state_from_redux,
    loading,
  };
};

export default useCatalogHook;
