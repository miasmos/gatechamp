import { Box } from "@mui/system";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import ErrorBoundary from "../components/ErrorBoundary";
import ModalContainer from "../components/ModalContainer";
import useFetchCharacter from "../hooks/useFetchCharacter";
import useFetchUser from "../hooks/useFetchUser";
import useInitializeUser from "../hooks/useInitializeUser";
import useNotification from "../hooks/useNotification";
import useWebSocketKills from "../hooks/useWebSocketKills";
import useWebSocketPushRoute from "../hooks/useWebSocketPushRoute";
import useWebSocketStatus from "../hooks/useWebSocketStatus";
import { redirectSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

function RootLayout() {
  const [{ loggedIn, redirect }, setUserState] = useRecoilState(userState);
  useFetchCharacter(loggedIn);
  useFetchUser(loggedIn);
  const setRedirect = redirectSetter(setUserState);
  const navigate = useNavigate();
  useInitializeUser();
  useWebSocketKills();
  useWebSocketStatus();
  useWebSocketPushRoute();
  useNotification();

  useEffect(() => {
    if (redirect) {
      setRedirect(undefined);
      navigate(redirect);
    }
  }, []);

  return (
    <Box width="100%" height="100%" className="layout__root">
      <>
        <ErrorBoundary>
          <Outlet />
          <ModalContainer />
        </ErrorBoundary>
      </>
    </Box>
  );
}

export default RootLayout;
