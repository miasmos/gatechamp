import { Stack, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBottomInfoItem from "./RouteRendererBottomInfoItem";

type RouteRendererProps = {
  node: RouteJumpSummary;
  position?: number;
  count: number;
  alwaysShowTitle?: boolean;
} & StackProps;

function RouteRendererBottomInfo({
  node,
  count,
  mt = 2,
  direction = "row",
  className,
  alwaysShowTitle = false,
  ...props
}: RouteRendererProps) {
  return (
    <Stack
      className="route__bottom-info"
      direction={direction}
      minHeight={58}
      mt={mt}
      {...props}
    >
      <RouteRendererBottomInfoItem
        key={node.name}
        alwaysShowTitle={alwaysShowTitle}
        direction={count > 20 ? "vertical" : "horizontal"}
        {...node}
      />
    </Stack>
  );
}

export default RouteRendererBottomInfo;
