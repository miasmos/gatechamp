import { Stack, Typography, StackProps } from "@mui/material";
import { FetchRouteResult } from "../../hooks/useFetchRoute";

type RouteRendererTopInfoProps = {
  route: FetchRouteResult;
  selectedIndex: number;
} & StackProps;

function RouteRendererTopInfo({
  route,
  mb = 2,
  height = 50,
  selectedIndex,
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
      {route.route.map(({ name, gateCamp }, index) => (
        <Stack
          width={`${100 / route.route.length}%`}
          sx={{
            opacity: selectedIndex === index && !gateCamp ? 1 : 0,
          }}
          key={name}
          justifyContent="flex-end"
        >
          <Typography variant="body2" whiteSpace="nowrap">
            {name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default RouteRendererTopInfo;
