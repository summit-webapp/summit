import ReactGA from 'react-ga4';

const useGoogleAnalyticsHandler = () => {
  const TRACKING_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_CODE;
  if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  } else {
    console.error('You have enabled Google Analytics but tracking ID is not specified. Please add Tracking ID!');
  }
  return {};
};

export default useGoogleAnalyticsHandler;
