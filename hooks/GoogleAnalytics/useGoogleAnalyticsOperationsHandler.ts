import ReactGA from 'react-ga4';

const useGoogleAnalyticsOperationsHandler = () => {
  const sendPageViewToGA = (pagePath: string, pageTitle: string) => {
    ReactGA.send({ hitType: 'pageview', page: pagePath, title: pageTitle });
  };
  return { sendPageViewToGA };
};

export default useGoogleAnalyticsOperationsHandler;
