import { Box } from "@mui/system";
import { Outlet } from "react-router";
import AppBar from "../components/AppBar";
import useInitializeUser from "../hooks/useInitializeUser";
import useWebSocket from "../hooks/useWebSocket";

function RootLayout() {
  useInitializeUser();
  useWebSocket();

  return (
    <Box className="App">
      <AppBar />
      <Outlet />
    </Box>
  );
}

export default RootLayout;
