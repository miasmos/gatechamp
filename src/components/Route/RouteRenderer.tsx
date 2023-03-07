import {
  Box,
  Chip,
  Stack,
  StackProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetchRoute from "../../hooks/useFetchRoute";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";
import RouteRendererBar from "./RouteRendererBar";
import PublishIcon from "@mui/icons-material/Publish";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
  jumpsSetter,
} from "../../recoil/route";
import { isLoggedInSelector } from "../../recoil/user";
import usePushRoute from "../../hooks/usePushRoute";
import { isConnectedSelector } from "../../recoil/user";
import OnlineIndicator from "../OnlineIndicator";

type RouteRendererProps = {
  position?: number;
  showProgress?: boolean;
  alwaysShowOrigin?: boolean;
  alwaysShowDestination?: boolean;
} & Omit<StackProps, "position">;

function RouteRenderer({
  position = 0,
  showProgress = false,
  alwaysShowDestination = false,
  alwaysShowOrigin = false,
  ...props
}: RouteRendererProps) {
  const isConnected = useRecoilValue(isConnectedSelector);
  const setRouteState = useSetRecoilState(routeState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  const [{ selectedIndex, pushedRouteId }, setState] = useState<{
    selectedIndex: number;
    pushedRouteId: undefined | number;
  }>({
    selectedIndex: -1,
    pushedRouteId: undefined,
  });
  const {
    origin,
    destination,
    avoidedSolarSystems,
    avoidEntryGateCamp,
    avoidGateCamp,
    avoidHics,
    avoidSmartBombs,
  } = useRecoilValue(routeState);

  const {
    data: route,
    isLoading,
    isValidating,
    hasError,
  } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map(({ solarSystemID }) => solarSystemID),
    { avoidEntryGateCamp, avoidGateCamp, avoidHics, avoidSmartBombs }
  );
  const hasValidRoute = route.route.length > 0;
  usePushRoute(
    route.route.map(({ solarSystemID }) => solarSystemID),
    pushedRouteId,
    isLoggedIn && hasValidRoute
  );

  const setJumps = (jumps: number) => jumpsSetter(setRouteState)(jumps);
  const onSelectIndex = (routeIndex: number) =>
    setState((state) => ({
      ...state,
      selectedIndex: routeIndex,
    }));
  const onAvoidSolarSystem = (solarSystemID: number, name: string) => {
    if (solarSystemID === origin || solarSystemID === destination) {
      return;
    }
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
  };
  const onUnavoidSolarSystem = (index: number) =>
    deleteAvoidSystemSetter(setRouteState)(index);
  const onPushRoute = () =>
    setState((state) => ({
      ...state,
      pushedRouteId: typeof pushedRouteId === "number" ? pushedRouteId + 1 : 0,
      lastPushedRouteId: pushedRouteId,
    }));

  useEffect(() => {
    if (route?.jumps) {
      setJumps(route.jumps);
    }
  }, [route]);

  return (
    <Stack {...props}>
      <Stack direction="row" spacing={2}>
        {route.jumps > 0 && (
          <Stack mt={4}>
            <Stack direction="row">
              <Typography>{showProgress ? position : route.jumps}</Typography>
              {showProgress && (
                <>
                  <Typography>&nbsp;/&nbsp;</Typography>
                  <Typography>{route.jumps}</Typography>
                </>
              )}
            </Stack>
          </Stack>
        )}
        <Stack direction="column" justifyContent="center" width="92.8%">
          <RouteRendererTopInfo
            route={route.route}
            selectedIndex={selectedIndex}
            alwaysShowDestination={alwaysShowDestination}
            alwaysShowOrigin={alwaysShowOrigin}
          />
          <RouteRendererBar
            route={route.route}
            position={position}
            selectedIndex={selectedIndex}
            onSelectIndex={onSelectIndex}
            onAvoid={onAvoidSolarSystem}
          />
          <RouteRendererBottomInfo
            route={route.route}
            selectedIndex={selectedIndex}
            alwaysShowDestination={alwaysShowDestination}
            alwaysShowOrigin={alwaysShowOrigin}
          />
        </Stack>
        <Box display={route.route.length > 0 ? "block" : "none"}>
          <OnlineIndicator
            ml={0.7}
            online={isConnected}
            fontSize="small"
            mt={5.1}
          />
        </Box>
      </Stack>
      <Stack alignItems="flex-start" direction="row" spacing={2}>
        {avoidedSolarSystems.map(({ name }, index) => (
          <Chip
            key={name}
            label={name}
            onDelete={() => onUnavoidSolarSystem(index)}
          />
        ))}
      </Stack>
      <Stack>
        {isLoggedIn && (
          <Tooltip title="Push to Eve Client">
            <PublishIcon
              sx={{
                mt: 2,
                cursor: hasValidRoute ? "pointer" : "default",
                opacity: hasValidRoute ? 1 : 0.6,
              }}
              onClick={onPushRoute}
            />
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}

export default RouteRenderer;
