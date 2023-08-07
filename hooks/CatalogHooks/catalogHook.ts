import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import CreateCatalog from "../../services/api/product-catalog-api/create-catalog-api";
import {
  catalog_summary_state,
  fetchCatalogList,
} from "../../store/slices/catalog-page-slice/get-catalog-slice";
import deleteCatalog from "../../services/api/product-catalog-api/delete-catalog-api";

const useCatalogHook = () => {
  const getcatalogList_reduxList: any = useSelector(catalog_summary_state);
  const [catalogName, setCatalogName] = useState<string>("");
  const [catalogSucessMsg, setCatalogSucessMsg] = useState("");
  const [catalogListItem, setCatalogListItem] = useState([]);
  const tokens = useSelector(get_access_token);
  const dispatch = useDispatch();
  const token = tokens.token;
  console.log(getcatalogList_reduxList, "tokens");
  const handleChange = (e: any) => {
    setCatalogName(e?.target?.value);
  };
  const handleSubmitCatalogName = async () => {
    const newCatalog = await CreateCatalog(catalogName, token);
    console.log(newCatalog.message.msg, "newCatalog");
    setCatalogSucessMsg(newCatalog?.message?.msg);
    if (newCatalog.message.msg === "success") {
      dispatch(fetchCatalogList(token));
      setCatalogName("")
    }
  };

  useEffect(() => {
    dispatch(fetchCatalogList(token));
  }, []);

  useEffect(() => {
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
    await deleteCatalog(catalog, token);
    setTimeout(() => {
      dispatch(fetchCatalogList(token));
    }, 700);
  };
  return {
    handleChange,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
  };
};

export default useCatalogHook;
