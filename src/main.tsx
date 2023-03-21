import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { AppRoute } from "./enum";
import RootLayout from "./layout/RootLayout";
import ScrolledLayout from "./layout/ScrolledLayout";
import NoScrollLayout from "./layout/NoScrollLayout";
import ToastContainer from "./components/ToastContainer";
import { ENABLE_STATION_TRADING } from "./constants";
import LoginContainer from "./components/Login/LoginContainer";
import CheckoutLayout from "./layout/CheckoutLayout";
import EmptyLayout from "./layout/EmptyLayout";

import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

const Cart = lazy(() => import("./components/Checkout/Cart"));
const CheckoutStart = lazy(() => import("./components/Checkout/CheckoutStart"));
const CheckoutPay = lazy(() => import("./components/Checkout/CheckoutPay"));
const CheckoutStatus = lazy(
  () => import("./components/Checkout/CheckoutStatus")
);
const PremiumShowcase = lazy(
  () => import("./components/Product/PremiumShowcase")
);
const RouteForm = lazy(() => import("./components/Route/RouteForm"));
const PrivacyPolicy = lazy(
  () => import("./components/PrivacyPolicy/PrivacyPolicy")
);
const TermsOfUse = lazy(() => import("./components/TermsOfUse/TermsOfUse"));
const Faq = lazy(() => import("./components/Faq/Faq"));
const CookiePolicy = lazy(
  () => import("./components/CookiePolicy/CookiePolicy")
);
const ShipsForm = lazy(() => import("./components/Ship/ShipsForm"));
const TripStationForm = lazy(
  () => import("./components/Trip/Station/TripStationForm")
);
const TripStationOverview = lazy(
  () => import("./components/Trip/Station/TripStationOverview")
);
const TripLayout = lazy(() => import("./layout/TripLayout"));
const StationFlowLayout = lazy(() => import("./layout/StationFlowLayout"));
const TripStationDetail = lazy(
  () => import("./components/Trip/Station/TripStationDetail")
);
const HaulForm = lazy(() => import("./components/Haul/HaulForm"));

// TODO: route mapping: time estimation, rank routes not just by profits, but by profit per second
// TODO: stopwatch, timing route from point to point, can use the eve api to fetch user's location periodically
// TODO: get live item ignore working again
// TODO: desktop notification if there's a gate camp on the current in progress route (kills by a gate, parse gank-intel channel?)
// TODO: isk earned per day tracker

Sentry.init({
  dsn: "https://c13cc5ecbe5243e48abede58b7bbd356@o1405566.ingest.sentry.io/4504810771644428",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={AppRoute.Home}
      element={<RootLayout />}
      errorElement={<>Not Found</>}
    >
      <Route path={AppRoute.Home} element={<NoScrollLayout />}>
        <Route index element={<RouteForm />} />
        <Route path={AppRoute.Login} element={<LoginContainer />} />
        <Route path={AppRoute.HaulerCalculator} element={<HaulForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path={AppRoute.Home} element={<ScrolledLayout />}>
        <Route path={AppRoute.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path={AppRoute.TermsOfUse} element={<TermsOfUse />} />
        <Route path={AppRoute.Faq} element={<Faq />} />
        <Route path={AppRoute.CookiePolicy} element={<CookiePolicy />} />
        <Route path={AppRoute.Premium} element={<PremiumShowcase />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path={AppRoute.Home} element={<CheckoutLayout />}>
        <Route path={AppRoute.Checkout} element={<EmptyLayout />}>
          <Route index element={<CheckoutStart />} />
          <Route path={AppRoute.Cart} element={<Cart />} />
          <Route path={AppRoute.Pay} element={<CheckoutPay />} />
          <Route path={AppRoute.Status} element={<CheckoutStatus />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {ENABLE_STATION_TRADING && (
        <Route path={AppRoute.Home} element={<NoScrollLayout />}>
          <Route path={AppRoute.Trip} element={<TripLayout />}>
            <Route index element={<Navigate to={AppRoute.StationFlow} />} />

            <Route path={AppRoute.StationFlow} element={<StationFlowLayout />}>
              <Route
                index
                element={<ShipsForm to={AppRoute.ConfigureRoute} />}
              />
              <Route
                path={AppRoute.ConfigureRoute}
                element={<TripStationForm to={`../${AppRoute.Overview}`} />}
              />
              <Route
                path={AppRoute.Overview}
                element={<TripStationOverview to={`../${AppRoute.Detail}`} />}
              />
            </Route>
          </Route>
        </Route>
      )}
      {ENABLE_STATION_TRADING && (
        <Route path={AppRoute.Home} element={<ScrolledLayout />}>
          <Route path={AppRoute.Trip} element={<TripLayout />}>
            <Route path={AppRoute.StationFlow} element={<StationFlowLayout />}>
              <Route
                path={AppRoute.Detail}
                element={
                  <TripStationDetail to={`../../${AppRoute.StationFlow}`} />
                }
              />
            </Route>
          </Route>
        </Route>
      )}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<></>}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <RouterProvider router={router} />
          {ToastContainer}
        </RecoilRoot>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
