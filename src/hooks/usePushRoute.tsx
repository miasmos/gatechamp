import { useRecoilState, useRecoilValue } from "recoil";
import { canPushRouteSelector, pushRouteSetter } from "../recoil/route";
import routeState from "../recoil/route/atom";
import { isOnlineSelector } from "../recoil/status";
import { isLoggedInSelector } from "../recoil/user";

function usePushRoute() {
  const [
    {
      pushRoute: { isPushing },
    },
    setRouteState,
  ] = useRecoilState(routeState);
  const setPushRoute = pushRouteSetter(setRouteState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const isOnline = useRecoilValue(isOnlineSelector);
  const canPushRoute = useRecoilValue(canPushRouteSelector);
  const canPushRouteWithAuth = isLoggedIn && isOnline && canPushRoute;

  const onPushRoute = () => {
    if (!canPushRouteWithAuth) {
      return;
    }
    setPushRoute({ shouldPushRoute: true });
  };

  return {
    canPushRoute: canPushRouteWithAuth,
    onPushRoute,
    setPushRoute,
    isPushingRoute: isPushing,
  };
}

export default usePushRoute;
