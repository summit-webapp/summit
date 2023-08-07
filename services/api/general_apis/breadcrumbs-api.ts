import axios from "axios";
import { CONSTANTS } from "../../config/app-config";


const FetchBreadCrumbsApi = async (request: any) => {
  let breadcrumbs_data: any;
  console.log("bread url", request);
  const paramURL = [...request.url];
  paramURL.shift();

  let [prodType, category, product] = paramURL;
  console.log("breadcrumb url", paramURL);
  const categoryUrl = category;
  const listingCategory = categoryUrl.split("?page")[0];
  product = product?.split("?currency")[0];

  console.log("breadcrumbs test ", paramURL, prodType);

  const version = CONSTANTS.VERSION;
  const method = "breadcrums";
  const entity = "mega_menu";
  const listingProductType = "listing";
  const listingBrandType = "brand";
  const catalogProductType = "catalog";
  let params: string = "";


  const config = {
    headers: {
      Authorization: request.token,
    },
  };

  if (prodType === "product-category") {
    if (prodType && category) {
      console.log("prodtype category subcategory subsubcategory");
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&category=${listingCategory}`;
    } else {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}`;
    }
  } else if (prodType === "product") {
    if (product) {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&category=${category}&product=${product}`;
    } else {
      params = `&method=${method}&entity=${entity}&product_type=${listingProductType}&product=${category}`;
    }
  } else if (prodType === "brand") {
    console.log("breadcrumbs test inside brand", prodType);
    params = `&method=${method}&entity=${entity}&product_type=${listingBrandType}&brand=${listingCategory}`;
  } else if (prodType === "brand-product") {
    params = `&method=${method}&entity=${entity}&product_type=${listingBrandType}&brand=${listingCategory}&product=${product}`;
  } else if (prodType === "catalog") {
    params = `&method=${method}&entity=${entity}&product_type=${catalogProductType}&category=${category}`;
  } else if (prodType === "catalog-product") {
    params = `&method=${method}&entity=${entity}&product_type=${catalogProductType}&category=${category}`;
  }

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=${version}${params}`,
      config
    )
    .then((res: any) => {
      breadcrumbs_data = res;
    })
    .catch((err: any) => {
      if (err.code === "ECONNABORTED") {
        breadcrumbs_data = "Request timed out";
      } else if (err.code === "ERR_BAD_REQUEST") {
        breadcrumbs_data = "Bad Request";
      } else if (err.code === "ERR_INVALID_URL") {
        breadcrumbs_data = "Invalid URL";
      } else {
        breadcrumbs_data = err;
      }
    });
  return breadcrumbs_data;
};

const getBreadCrumbs = (request: any) => FetchBreadCrumbsApi(request);

export default getBreadCrumbs;
