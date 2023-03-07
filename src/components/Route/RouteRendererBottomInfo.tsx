import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBottomInfoItem from "./RouteRendererBottomInfoItem";

type RouteRendererProps = {
  route: RouteJumpSummary[];
  position?: number;
  selectedIndex: number;
  alwaysShowDestination: boolean;
  alwaysShowOrigin: boolean;
} & StackProps;

function RouteRendererBottomInfo({
  route,
  height = 50,
  mt = 2,
  selectedIndex,
  direction = "row",
  className,
  alwaysShowDestination,
  alwaysShowOrigin,
  ...props
}: RouteRendererProps) {
  return (
    <Stack
      className={`route__info-bottom ${className}`}
      direction={direction}
      mt={mt}
      height={height}
      {...props}
    >
      {route.map((solarSystem, index) => (
        <RouteRendererBottomInfoItem
          key={solarSystem.name}
          index={index}
          selectedIndex={selectedIndex}
          count={route.length}
          alwaysShowDestination={alwaysShowDestination}
          alwaysShowOrigin={alwaysShowOrigin}
          {...solarSystem}
        />
      ))}
    </Stack>
  );
}

export default RouteRendererBottomInfo;
