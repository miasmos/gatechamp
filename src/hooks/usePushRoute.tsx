import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getJumpsSelector, pushedRouteIdSetter } from "../recoil/route";
import routeState from "../recoil/route/atom";
import { isOnlineSelector } from "../recoil/status";
import { isLoggedInSelector } from "../recoil/user";
import useFetchPushRoute from "./useFetchPushRoute";

function usePushRoute() {
  const [{ pushedRouteId, route }, setRouteState] = useRecoilState(routeState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const isOnline = useRecoilValue(isOnlineSelector);
  const jumps = useRecoilValue(getJumpsSelector);
  const setPushedRouteId = pushedRouteIdSetter(setRouteState);
  const canPushRoute = isLoggedIn && isOnline && jumps > 0 && route.length > 0;

  useFetchPushRoute(route, pushedRouteId, canPushRoute);

  useEffect(() => {
    setPushedRouteId(true);
  }, []);

  const onPushRoute = () => {
    if (jumps === 0) {
      return;
    }
    setPushedRouteId();
  };

  return { canPushRoute, pushRoute: onPushRoute };
}

export default usePushRoute;
