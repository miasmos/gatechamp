import { Box } from "@mui/system";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import ModalContainer from "../components/ModalContainer";
import useFetchCharacter from "../hooks/useFetchCharacter";
import useFetchUser from "../hooks/useFetchUser";
import useInitializeUser from "../hooks/useInitializeUser";
import useWebSocketKills from "../hooks/useWebSocketKills";
import useWebSocketPushRoute from "../hooks/useWebSocketPushRoute";
import useWebSocketStatus from "../hooks/useWebSocketStatus";
import { pushRouteSetter } from "../recoil/route";
import routeState from "../recoil/route/atom";
import { redirectSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

function RootLayout() {
  const [{ loggedIn, redirect }, setUserState] = useRecoilState(userState);
  const setRouteState = useSetRecoilState(routeState);
  const setPushRouteState = pushRouteSetter(setRouteState);
  useFetchCharacter(loggedIn);
  useFetchUser(loggedIn);
  const setRedirect = redirectSetter(setUserState);
  const navigate = useNavigate();
  useInitializeUser();
  useWebSocketKills();
  useWebSocketStatus();
  useWebSocketPushRoute();

  useEffect(() => {
    setPushRouteState({ didPushRoute: false });
    if (redirect) {
      setRedirect(undefined);
      navigate(redirect);
    }
  }, []);

  return (
    <Box width="100%" height="100%" className="layout__root">
      <>
        <Outlet />
        <ModalContainer />
      </>
    </Box>
  );
}

export default RootLayout;
