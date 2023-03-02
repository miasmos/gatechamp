import { Stack, StackProps, Typography } from "@mui/material";
import { useState } from "react";
import { FetchRouteResult } from "../../hooks/useFetchRoute";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";
import RouteRendererBar from "./RouteRendererBar";

type RouteRendererProps = {
  route: FetchRouteResult;
  position?: number;
  onAvoid: (solarSystemID: number, name: string) => void;
  showProgress?: boolean;
} & Omit<StackProps, "position">;

function RouteRenderer({
  route,
  position = route.route.length,
  onAvoid,
  showProgress = false,
  ...props
}: RouteRendererProps) {
  const [{ selectedIndex }, setState] = useState<{
    selectedIndex: number;
  }>({ selectedIndex: -1 });

  const onSelectIndex = (routeIndex: number) =>
    setState((state) => ({
      ...state,
      selectedIndex: routeIndex,
    }));

  return (
    <Stack direction="row" spacing={2} {...props}>
      {route.jumps > 0 && (
        <Stack mt={4}>
          <Stack direction="row">
            <Typography>{position}</Typography>
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
          onAvoid={onAvoid}
        />
        <RouteRendererBottomInfo route={route} />
      </Stack>
    </Stack>
  );
}

export default RouteRenderer;
