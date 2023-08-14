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
import { failmsg, hideToast, successmsg } from "../../store/slices/general_slices/toast_notification_slice";

const useCatalogHook = () => {
  const getcatalogList_reduxList: any = useSelector(catalog_summary_state);
  const [catalogName, setCatalogName] = useState<string>("");
  const [catalogSucessMsg, setCatalogSucessMsg] = useState("");
  const [catalogListItem, setCatalogListItem] = useState([]);
  const [loading, setLoading] = useState("")
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
    console.log(newCatalog.message.error, "newCatalog");
    setCatalogSucessMsg(newCatalog?.message?.msg);
    if (newCatalog.message.msg === "success") {
      dispatch(successmsg("Catalog created sucessfully"));
      dispatch(fetchCatalogList(token));
      setCatalogName("")
      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    }
    else {
      dispatch(failmsg(newCatalog.message.error));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
  };

  useEffect(() => {
    dispatch(fetchCatalogList(token));
  }, []);

  useEffect(() => {
    setLoading(getcatalogList_reduxList?.isLoading)
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
   if(deleteCatalogs?.message?.msg === "success") {
    dispatch(successmsg("Catalog Deleted Successfuly"));
    setTimeout(() => {
      dispatch(fetchCatalogList(token));
      dispatch(hideToast());
    }, 1000);
   }
   else {
    dispatch(failmsg("Error in deleting the catalog"));
    setTimeout(() => {
      dispatch(hideToast());
    }, 1000);
   }
  };
  const handleAddProduct = async( catalogname:any,name:any) => {
    console.log(catalogname, name, "CatalogName")
    // const CatalogName = catalogname.replace(/-/g, " ");
    const productdata = {
      catalogNames:catalogname,
      ItemCode:name,
      tokens:token
    }
   const getCatalogList = await AddProductToCatalogList(productdata);
   if(getCatalogList.data.message.msg ==="success"){
    dispatch(successmsg("Item Added To Catalog Successfuly"));
    setTimeout(() => {
      dispatch(fetchCatalogList(token));
      dispatch(hideToast());
    }, 1000);
   }
   else {
    dispatch(failmsg("Error in adding product to catalog"));
    setTimeout(() => {
      dispatch(hideToast());
    }, 1000);
   }
  
   
  }
  console.log(loading,"getCatalogList")
  return {
    handleChange,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
    handleAddProduct,
    currency_state_from_redux,
    loading
  };
};

export default useCatalogHook;
