let Components: Array<{
  page_name: string;
  section_name: string;
  component_name: string;
}> = [
  { page_name: 'HomePage', section_name: 'BannerSection', component_name: 'HomeBannersInspiration1' },
  { page_name: 'HomePage', section_name: 'PersonalizedCategories', component_name: 'PersonalizedCategoriesInspiration1' },
  //   { page_name: 'HomePage', section_name: 'BrandSection', component_name: 'BrandsSectionInspiration1' },
  //   { page_name: 'HomePage', section_name: 'FeaturedCollections', component_name: 'FeaturedCollectionInspiration1' },
];

import HomeBannersInspiration1Master from '../components/HomePage/BannerSection/HomeBannersInspiration1/MasterComponent';

// Components['Component1'] = require(`../components/HomePage/BannerSection/${}/HomeBannersMaster`);

export default Components;
