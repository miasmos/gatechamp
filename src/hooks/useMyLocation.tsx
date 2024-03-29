import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  originNameSetter,
  originSetter,
  isUsingMyLocationSetter,
} from "../recoil/route";
import routeState from "../recoil/route/atom";
import {
  hasLocationSelector,
  getLocationSelector,
  isOnlineSelector,
} from "../recoil/status";
import { isLoggedInSelector } from "../recoil/user";

function useMyLocation() {
  const setRouteState = useSetRecoilState(routeState);
  const { isUsingMyLocation } = useRecoilValue(routeState);
  const hasLocation = useRecoilValue(hasLocationSelector);
  const location = useRecoilValue(getLocationSelector);
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const isOnline = useRecoilValue(isOnlineSelector);
  const setIsUsingMyLocation = isUsingMyLocationSetter(setRouteState);
  const setOrigin = originSetter(setRouteState);
  const setOriginName = originNameSetter(setRouteState);

  const canUseMyLocation = loggedIn && isOnline && hasLocation;
  const isMyLocationAvailable = canUseMyLocation && isUsingMyLocation;

  const onUseMyLocation = (nextIsUsingMyLocation: boolean) => {
    if (nextIsUsingMyLocation) {
      if (!canUseMyLocation) {
        return;
      }
      setOriginName(location.solarSystemName);
      setOrigin(location.solarSystemID);
    }
    setIsUsingMyLocation(nextIsUsingMyLocation);
  };

  useEffect(() => {
    const canUseMyLocation =
      loggedIn && isOnline && hasLocation && isUsingMyLocation;
    if (canUseMyLocation) {
      onUseMyLocation(true);
    }
  }, [location, hasLocation, isUsingMyLocation, loggedIn, isOnline]);

  return {
    canUseMyLocation,
    isUsingMyLocation,
    isMyLocationAvailable,
    onUseMyLocation,
  };
}

export default useMyLocation;
