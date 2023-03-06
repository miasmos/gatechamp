import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererTopInfoItem from "./RouteRendererTopInfoItem";

type RouteRendererTopInfoProps = {
  route: RouteJumpSummary[];
  selectedIndex: number;
  alwaysShowOrigin?: boolean;
  alwaysShowDestination?: boolean;
} & StackProps;

function RouteRendererTopInfo({
  route,
  mb = 2,
  height = 20,
  selectedIndex,
  alwaysShowDestination = false,
  alwaysShowOrigin = false,
  ...props
}: RouteRendererTopInfoProps) {
  return (
    <Stack
      className="route__info-top"
      direction="row"
      mb={mb}
      height={height}
      {...props}
    >
      {route.map((solarSystem, index) => (
        <RouteRendererTopInfoItem
          key={index}
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

export default RouteRendererTopInfo;
