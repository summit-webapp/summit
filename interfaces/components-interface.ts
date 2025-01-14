export interface HomePageComponentTypes {
  component: string;
  component_name: string;
  section_name: string;
  page_name: string;
  image: string;
}

export interface HomePageComponentInfoTypes {
  page_name: string;
  page_url: string;
  from_date: string;
  to_date: string;
  page_type: string;
  product_category_page_layout: string;
  filters_component: string;
  product_card_components: string;
  associated_component: HomePageComponentTypes[];
}
