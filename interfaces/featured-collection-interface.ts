export default interface FeaturedCollectionProductTypes {
  variant: any[];
  url: string;
  display_tag: string[];
  image: string;
  replacement_done: boolean | null;
  rating: number;
  min_order_qty: number;
  currency_symbol: string;
  brand: string | null;
  item_name: string;
  in_stock_status: boolean;
  access_level: number;
  disabled: number;
  category: string;
  is_replacement: boolean | null;
  currency: string;
  order_status: string | null;
  oem_part_number: string | null;
  status: string;
  price: number;
  mrp_price: number;
  short_description: string | null;
  variant_of: string;
  attributes: any[];
  has_variants: number;
  strikethrough_rate: number | null;
  brand_img: string | null;
  name: string;
  slug: string;
}
export default interface FeaturedCollectionTypes {
  description: string | null;
  tag_image: string | null;
  tag_name: string | null;
  value: FeaturedCollectionProductTypes[];
}
