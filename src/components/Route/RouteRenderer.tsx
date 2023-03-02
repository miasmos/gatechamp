import { Chip, Stack, StackProps, Typography } from "@mui/material";
import { useState } from "react";
import useFetchRoute from "../../hooks/useFetchRoute";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";
import RouteRendererBar from "./RouteRendererBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FavoriteIcon from "@mui/icons-material/Favorite";
import routeState from "../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
} from "../../recoil/route";

type RouteRendererProps = {
  position?: number;
  showProgress?: boolean;
} & Omit<StackProps, "position">;

function RouteRenderer({
  position = 0,
  showProgress = false,
  ...props
}: RouteRendererProps) {
  const setRouteState = useSetRecoilState(routeState);
  const [{ selectedIndex }, setState] = useState<{
    selectedIndex: number;
  }>({ selectedIndex: -1 });
  const { origin, destination, avoidedSolarSystems } =
    useRecoilValue(routeState);
  const {
    data: route,
    isLoading,
    isValidating,
  } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map(({ solarSystemID }) => solarSystemID)
  );

  const onSelectIndex = (routeIndex: number) =>
    setState((state) => ({
      ...state,
      selectedIndex: routeIndex,
    }));
  const onAvoidSolarSystem = (solarSystemID: number, name: string) =>
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
  const onUnavoidSolarSystem = (index: number) =>
    deleteAvoidSystemSetter(setRouteState)(index);

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
          <RouteRendererTopInfo route={route} selectedIndex={selectedIndex} />
          <RouteRendererBar
            route={route}
            position={position}
            selectedIndex={selectedIndex}
            onSelectIndex={onSelectIndex}
            onAvoid={onAvoidSolarSystem}
          />
          <RouteRendererBottomInfo route={route} />
        </Stack>
        <Stack fontSize={15}>
          <FavoriteIcon
            sx={{
              transition: "all 1s ease-out 0s",
              transform: isValidating ? "scale(2.4)" : "scale(1)",
              mt: "36px",
            }}
            fontSize="inherit"
          />
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
    </Stack>
  );
}

export default RouteRenderer;
