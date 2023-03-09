import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import AppBar from "../components/AppBar";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/Footer";
import DebugObserver from "../components/RecoilObserver";
import useFetchCharacter from "../hooks/useFetchCharacter";
import useInitializeUser from "../hooks/useInitializeUser";
import useWebSocketKills from "../hooks/useWebSocketKills";
import useWebSocketStatus from "../hooks/useWebSocketStatus";
import shipsState, { Ship } from "../recoil/ships/atom";
import userState from "../recoil/user/atom";

function RootLayout() {
  const [{ ships, shipsSelected }, setShipState] = useRecoilState(shipsState);
  const { loggedIn } = useRecoilValue(userState);
  useInitializeUser();
  useWebSocketKills();
  useWebSocketStatus();
  useFetchCharacter(loggedIn);

  useEffect(() => {
    const nextShipsSelected: boolean[] = [];
    const nextShips = ships.reduce<Ship[]>((prev, current, index) => {
      const isShipValid =
        current.name.length > 0 &&
        current.static.typeName.length > 0 &&
        current.cargoBay.main.volume > 0;
      if (isShipValid) {
        prev.push(current);
        nextShipsSelected.push(shipsSelected[index]);
      }
      return prev;
    }, []);

    setShipState((state) => ({
      ...state,
      ships: nextShips,
      shipsSelected: nextShipsSelected,
    }));
  }, []);

  return (
    <Box width="100%" height="100%" className="layout__root">
      <>
        <DebugObserver />
        <ErrorBoundary>
          <AppBar />
          <Container
            sx={{ display: "flex", flex: 1, mt: "90px", minHeight: "70vh" }}
          >
            <Outlet />
          </Container>
          <Footer />
        </ErrorBoundary>
      </>
    </Box>
  );
}

export default RootLayout;
