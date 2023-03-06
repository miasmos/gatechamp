import { Chip, Stack, StackProps, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useFetchRoute from "../../hooks/useFetchRoute";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";
import RouteRendererBar from "./RouteRendererBar";
import PublishIcon from "@mui/icons-material/Publish";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import routeState from "../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
  jumpsSetter,
} from "../../recoil/route";
import { isLoggedInSelector } from "../../recoil/user";
import usePushRoute from "../../hooks/usePushRoute";
import { isConnectedSelector } from "../../recoil/user";

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
  const { origin, destination, avoidedSolarSystems } =
    useRecoilValue(routeState);

  const {
    data: route,
    isLoading,
    isValidating,
    hasError,
  } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map(({ solarSystemID }) => solarSystemID)
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
  const onAvoidSolarSystem = (solarSystemID: number, name: string) =>
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
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
          <RouteRendererBottomInfo route={route.route} />
        </Stack>
        <Stack
          fontSize={13}
          display={route.route.length > 0 ? "flex" : "none"}
          direction="row"
        >
          {!isConnected ? (
            <Tooltip title="Offline">
              <CircleOutlinedIcon
                sx={{ opacity: 0.7, mt: "37px" }}
                fontSize="inherit"
              />
            </Tooltip>
          ) : (
            <Tooltip title="Online">
              <Stack
                sx={{
                  mt: "41px",
                  boxShadow: "0 0 1px 1px #0000001a",
                  width: 5,
                  height: 5,
                  "@keyframes pulse": {
                    from: {
                      boxShadow: `0 0 0 0 rgba(0, 0, 0, 0.4)`,
                    },
                    to: {
                      boxShadow: `0 0 0 9px rgba(0, 0, 0, 0)`,
                    },
                  },
                  borderRadius: "50%",
                  animation: "pulse 3s infinite",
                }}
                alignItems="center"
                justifyContent="center"
              >
                <CircleIcon fontSize="inherit" htmlColor="green" />
              </Stack>
            </Tooltip>
          )}
        </Stack>
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
