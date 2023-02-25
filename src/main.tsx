import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { AppRoute } from "./enum";
import ShipsForm from "./components/Ship/ShipsForm";
import TripStationForm from "./components/Trip/Station/TripStationForm";
import TripStationResults from "./components/Trip/Station/TripStationResults";
import AppLayout from "./layout/RootLayout";
import TripLayout from "./layout/TripLayout";
import StationFlowLayout from "./layout/StationFlowLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={AppRoute.Home}
      element={<AppLayout />}
      errorElement={<>Not Found</>}
    >
      <Route index element={<Navigate to={AppRoute.Trip} />} />

      <Route path={AppRoute.Trip} element={<TripLayout />}>
        <Route index element={<Navigate to={AppRoute.StationFlow} />} />

        <Route path={AppRoute.StationFlow} element={<StationFlowLayout />}>
          <Route index element={<ShipsForm to={AppRoute.ConfigureTrip} />} />
          <Route
            path={AppRoute.ConfigureTrip}
            element={<TripStationForm to={`../${AppRoute.Result}`} />}
          />
          <Route
            path={AppRoute.Result}
            element={<TripStationResults to={AppRoute.Home} />}
          />
          <Route path="test" element={<>test</>} />
        </Route>
      </Route>
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
