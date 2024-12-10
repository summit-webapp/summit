export interface ComponentsTypes {
  name: string; // The name of the page section
  component: string; // The type of component used
  page_name: string; // The name of the page (e.g., 'home-page')
  section_name: string; // The section within the page (e.g., 'BannerSection')
  image: string | null; // The image URL, which can be null if not provided
}

export interface PageMetaDataTypes {
  page_name: string;
  meta_title: string;
  robots: string;
  description: string;
}
interface PageData {
  metaData: PageMetaDataTypes;
  multiLingualListTranslationTextList: any[];
  componentsList: ComponentsTypes[];
}
export interface ServerDataTypes {
  serverDataForPages: PageData;
}
