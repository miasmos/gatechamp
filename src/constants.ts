const APP_API_DOMAIN = import.meta.env.VITE_APP_API_DOMAIN;
const APP_WEBSOCKET_DOMAIN = import.meta.env.VITE_APP_WEBSOCKET_DOMAIN;
const DEVELOPMENT = import.meta.env.DEV;
const PRODUCTION = import.meta.env.PROD;
const INQUIRIES_EMAIL = import.meta.env.VITE_INQUIRIES_EMAIL;
const WEBSITE_NAME = import.meta.env.VITE_WEBSITE_NAME;
const WEBSITE_TITLE = import.meta.env.VITE_WEBSITE_TITLE;
const ENABLE_STATION_TRADING =
  import.meta.env.VITE_ENABLE_STATION_TRADING === "true";
const STRIPE_CLIENT_KEY = import.meta.env.VITE_STRIPE_CLIENT_KEY;
const APP_DOMAIN = `${document.location.protocol}//${document.location.host}`;
const EVE_ADMIN_CHARACTER_NAME = import.meta.env.VITE_EVE_ADMIN_CHARACTER_NAME;

export {
  APP_API_DOMAIN,
  APP_WEBSOCKET_DOMAIN,
  INQUIRIES_EMAIL,
  WEBSITE_NAME,
  WEBSITE_TITLE,
  DEVELOPMENT,
  ENABLE_STATION_TRADING,
  PRODUCTION,
  STRIPE_CLIENT_KEY,
  APP_DOMAIN,
  EVE_ADMIN_CHARACTER_NAME,
};
