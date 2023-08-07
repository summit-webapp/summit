export const event = ({ action, params }) => {
    window.gtag('event', action, params)
  }