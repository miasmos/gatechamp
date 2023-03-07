import { Box } from "@mui/system";
import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import AppBar from "../components/AppBar";
import ErrorBoundary from "../components/ErrorBoundary";
import DebugObserver from "../components/RecoilObserver";
import useFetchCharacter from "../hooks/useFetchCharacter";
import useInitializeUser from "../hooks/useInitializeUser";
import useKillsWebsocket from "../hooks/useKillsWebsocket";
import useStatusWebsocket from "../hooks/useStatusWebsocket";
import userState from "../recoil/user/atom";

function RootLayout() {
  const { loggedIn } = useRecoilValue(userState);
  useInitializeUser();
  useKillsWebsocket();
  useStatusWebsocket();
  useFetchCharacter(loggedIn);

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
