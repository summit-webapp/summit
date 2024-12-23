export interface ComponentTypes {
  name: string; // The name of the page section
  component: string; // The type of component used
  page_name: string; // The name of the page (e.g., 'home-page')
  section_name: string; // The section within the page (e.g., 'BannerSection')
  image: string | null; // The image URL, which can be null if not provided
}

export interface ComponentsListTypes {
  pageName: string;
  componentsList: ComponentTypes[]; // An array of `PageData` objects
}

export interface ProductListPageComponentsListTypes {
  pageName: string;
  componentList: ComponentTypes[];
  layoutName: string;
  layoutComponentsList: ComponentTypes[];
}
