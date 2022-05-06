export const GA_TRACKING_ID = "G-G71ES07K2X"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url, title) => {
  if(typeof window.gtag !== 'undefined'){
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}