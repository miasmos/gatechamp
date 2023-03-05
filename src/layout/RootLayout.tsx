import { Box } from "@mui/system";
import { Outlet } from "react-router";
import AppBar from "../components/AppBar";
import ErrorBoundary from "../components/ErrorBoundary";
import DebugObserver from "../components/RecoilObserver";
import useInitializeUser from "../hooks/useInitializeUser";
import useWebSocket from "../hooks/useWebSocket";

function RootLayout() {
  useInitializeUser();
  useWebSocket();

  return (
    <Box className="App">
      <>
        <DebugObserver />
        <ErrorBoundary>
          <AppBar />
          <Outlet />
        </ErrorBoundary>
      </>
    </Box>
  );
}

export default RootLayout;
