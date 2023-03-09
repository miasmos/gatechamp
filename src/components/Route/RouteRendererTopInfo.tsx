import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererTopInfoItem from "./RouteRendererTopInfoItem";

type RouteRendererTopInfoProps = {
  node: RouteJumpSummary;
  alwaysShowTitle?: boolean;
} & StackProps;

function RouteRendererTopInfo({
  node,
  mb = 2,
  height = 20,
  alwaysShowTitle,
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
        alwaysShowTitle={alwaysShowTitle}
        {...node}
      />
    </Stack>
  );
}

export default RouteRendererTopInfo;
