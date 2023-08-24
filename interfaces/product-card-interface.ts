export interface ProductCardProps {
  key: any;
  name: string;
  in_stock_status: boolean;
  url: string;
  img_url: string;
  display_tag: string[];
  currency_symbol: any;
  item_name: string;
  price: number;
  mrp_price: number;
  item_slug: string;
  brand: string;
  brand_img: string;
  star_rating: any;
  wishlistData?: any;
  currency_state_from_redux?: any;
  selectLangData?: any;
  selectedMultiLangData?: any;
  query?: any;
  catalogListItem?: any,
  handleAddProduct?: any,
  handleSubmitCatalogName?: any,
  handleChange?: any
}
