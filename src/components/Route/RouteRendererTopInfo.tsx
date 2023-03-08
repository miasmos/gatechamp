import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererTopInfoItem from "./RouteRendererTopInfoItem";

type RouteRendererTopInfoProps = {
  node: RouteJumpSummary;
  count: number;
  index: number;
  alwaysShowOrigin?: boolean;
  alwaysShowDestination?: boolean;
} & StackProps;

function RouteRendererTopInfo({
  node,
  count,
  index,
  mb = 2,
  height = 20,
  alwaysShowDestination = false,
  alwaysShowOrigin = false,
  ...props
}: RouteRendererTopInfoProps) {
  return (
    <Stack
      className="route__top-info"
      direction="row"
      mb={mb}
      height={height}
      {...props}
    >
      <RouteRendererTopInfoItem
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

export default RouteRendererTopInfo;
