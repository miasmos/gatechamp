import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
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
// import ShipsForm from "./components/Ship/ShipsForm";
// import TripStationForm from "./components/Trip/Station/TripStationForm";
// import TripStationOverview from "./components/Trip/Station/TripStationOverview";
import RootLayout from "./layout/RootLayout";
// import TripLayout from "./layout/TripLayout";
// import StationFlowLayout from "./layout/StationFlowLayout";
// import TripStationDetail from "./components/Trip/Station/TripStationDetail";
import RouteForm from "./components/Route/RouteForm";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import ScrolledLayout from "./layout/ScrolledLayout";
import NoScrollLayout from "./layout/NoScrollLayout";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TermsOfUse from "./components/TermsOfUse/TermsOfUse";
import Faq from "./components/Faq/Faq";

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
        <Route index path={AppRoute.Home} element={<RouteForm />} />
      </Route>
      <Route path={AppRoute.Home} element={<ScrolledLayout />}>
        <Route
          index
          path={AppRoute.PrivacyPolicy}
          element={<PrivacyPolicy />}
        />
        <Route index path={AppRoute.TermsOfUse} element={<TermsOfUse />} />
        <Route index path={AppRoute.Faq} element={<Faq />} />
      </Route>

      {/* <Route path={AppRoute.Trip} element={<TripLayout />}>
        <Route index element={<Navigate to={AppRoute.StationFlow} />} />

        <Route path={AppRoute.StationFlow} element={<StationFlowLayout />}>
          <Route index element={<ShipsForm to={AppRoute.ConfigureRoute} />} />
          <Route
            path={AppRoute.ConfigureRoute}
            element={<TripStationForm to={`../${AppRoute.Overview}`} />}
          />
          <Route
            path={AppRoute.Overview}
            element={<TripStationOverview to={`../${AppRoute.Detail}`} />}
          />
          <Route
            path={AppRoute.Detail}
            element={<TripStationDetail to={AppRoute.Home} />}
          />
        </Route>
      </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
