export interface ComponentTypes {
  component: string;
  component_name: string;
  section_name: string;
  page_name: string;
  image: string;
  properties?: string;
}

export interface WebsiteInterfaceTypes {
  page_name: string;
  page_url: string;
  from_date: string;
  to_date: string;
  page_type: string;
  product_category_page_layout?: string;
  filters_component?: string;
  product_card_components?: string;
  magnified_image_component?: string;
  product_information_component?: string;
  associated_component?: ComponentTypes[];
  top_section_component?: ComponentTypes[];
  bottom_section_component?: ComponentTypes[];
}
