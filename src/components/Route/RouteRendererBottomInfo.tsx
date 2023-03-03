import { Stack, Box, Typography, Tooltip, StackProps } from "@mui/material";
import { FetchRouteResult } from "../../hooks/useFetchRoute";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import RocketIcon from "@mui/icons-material/Rocket";
import TungstenIcon from "@mui/icons-material/Tungsten";
import SkullIcon from "../icon/SkullIcon";

type RouteRendererProps = {
  route: FetchRouteResult;
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
      {route.route.map(
        ({
          name,
          gateCamp,
          hics,
          smartBombs,
          kills,
          attackers,
          entry: { gateCamp: entryGateCamp },
          exit: { gateCamp: exitGateCamp },
        }) => (
          <Box
            width={`${100 / route.route.length}%`}
            sx={{
              opacity: gateCamp ? 1 : 0,
            }}
            key={name}
          >
            <Typography
              variant="body2"
              whiteSpace="nowrap"
              textAlign={exitGateCamp && !entryGateCamp ? "right" : "left"}
              sx={{
                visibility: kills > 0 ? "visible" : "none",
                pointerEvents: kills > 0 ? "all" : "none",
              }}
            >
              {name}
            </Typography>

            <Stack
              direction={exitGateCamp && !entryGateCamp ? "row-reverse" : "row"}
            >
              <Stack
                sx={{
                  visibility: kills > 0 ? "visible" : "none",
                  pointerEvents: kills > 0 ? "all" : "none",
                }}
              >
                <Tooltip title="Kills">
                  <SkullIcon />
                </Tooltip>
                <Typography variant="body2" fontSize={11}>
                  {kills}
                </Typography>
              </Stack>
              <Stack>
                <Tooltip title="Attackers">
                  <RocketIcon sx={{ fontSize: 15 }} />
                </Tooltip>
                <Typography variant="body2" fontSize={11}>
                  {attackers}
                </Typography>
              </Stack>
              <Stack display={hics ? "flex" : "none"}>
                <Tooltip title="Heavy Interdiction Cruisers">
                  <CallSplitIcon
                    sx={{
                      fontSize: 15,
                    }}
                  />
                </Tooltip>
              </Stack>
              <Stack display={smartBombs ? "flex" : "none"}>
                <Tooltip title="Smart Bombs">
                  <TungstenIcon sx={{ fontSize: 15 }} />
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        )
      )}
    </Stack>
  );
}

export default RouteRendererBottomInfo;
