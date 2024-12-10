export interface PageMetaDataTypes {
  page_name: string;
  meta_title: string;
  robots: string;
  description: string;
}
interface PageData {
  metaData: PageMetaDataTypes;
  multiLingualListTranslationTextList: any[];
}
export interface ServerDataTypes {
  serverDataForPages: PageData;
}
