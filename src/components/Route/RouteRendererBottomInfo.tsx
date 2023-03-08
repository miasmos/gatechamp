import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBottomInfoItem from "./RouteRendererBottomInfoItem";

type RouteRendererProps = {
  node: RouteJumpSummary;
  position?: number;
  index: number;
  count: number;
  alwaysShowDestination: boolean;
  alwaysShowOrigin: boolean;
} & StackProps;

function RouteRendererBottomInfo({
  node,
  index,
  count,
  height = 50,
  mt = 2,
  direction = "row",
  className,
  alwaysShowDestination,
  alwaysShowOrigin,
  ...props
}: RouteRendererProps) {
  return (
    <Stack
      className="route__bottom-info"
      direction={direction}
      mt={mt}
      height={height}
      {...props}
    >
      <RouteRendererBottomInfoItem
        key={node.name}
        index={index}
        count={count}
        alwaysShowDestination={alwaysShowDestination}
        alwaysShowOrigin={alwaysShowOrigin}
        {...node}
      />
    </Stack>
  );
}

export default RouteRendererBottomInfo;
