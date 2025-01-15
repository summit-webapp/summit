import { SummitSettingsTypes } from '../interfaces/summit-settings';
import fetchSummitSettings from '../services/api/settings/fetch-summit-settings';
import MyApp from './_app';

export async function getStaticProps() {
  let layoutData: SummitSettingsTypes = {};
  // Call the API to fetch Summit Settings
  const getSummitSettingsDataFromAPI = await fetchSummitSettings();
  if (getSummitSettingsDataFromAPI?.status === 200 && Object.keys(getSummitSettingsDataFromAPI?.data?.data)?.length > 0) {
    layoutData = getSummitSettingsDataFromAPI?.data?.data;
  }
  console.log('settings data', getSummitSettingsDataFromAPI);

  // Return props for _app component
  return {
    props: {
      layoutData,
    },
  };
}

export default function AppWrapper(props: any) {
  return <MyApp {...props} />;
}
