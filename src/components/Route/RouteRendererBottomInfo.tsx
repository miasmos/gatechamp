import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBottomInfoItem from "./RouteRendererBottomInfoItem";

type RouteRendererProps = {
  route: RouteJumpSummary[];
  position?: number;
} & StackProps;

function RouteRendererBottomInfo({
  route,
  height = 50,
  mt = 2,
  direction = "row",
  className,
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
          count={route.length}
          previousSolarSystemId={
            index === 0 ? undefined : route[index - 1].solarSystemID
          }
          {...solarSystem}
        />
      ))}
    </Stack>
  );
}

export default RouteRendererBottomInfo;
