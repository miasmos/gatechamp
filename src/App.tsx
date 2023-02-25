import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ShipsForm from "./components/Ship/ShipsForm";
import TripStationForm from "./components/Trip/Station/TripStationForm";
import TripStationResult from "./components/Trip/Station/TripStationResults";
import { AppRoute } from "./enum";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={AppRoute.Home} element={<ShipsForm />} />
        <Route path={AppRoute.TripConfig} element={<TripStationForm />} />
        <Route path={AppRoute.TripResult} element={<TripStationResult />} />
      </Route>
    </Routes>
  );
}

export default App;
