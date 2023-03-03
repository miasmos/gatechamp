import { Box, Stack, Typography, StackProps } from "@mui/material";
import { FetchRouteResult } from "../../hooks/useFetchRoute";
import { getSecurityColor } from "../../util/eveTrade";
import Tooltip from "@mui/material/Tooltip";
import Tick from "./Tick";

type RouteRendererProps = {
  route: FetchRouteResult;
  position: number;
  showPosition?: boolean;
  onAvoid: (solarSystemID: number, name: string) => void;
  onSelectIndex: (routeIndex: number) => void;
  selectedIndex: number;
} & Omit<StackProps, "position">;

function RouteRendererBar({
  route,
  position,
  showPosition = false,
  selectedIndex,
  onAvoid,
  onSelectIndex,
  ...props
}: RouteRendererProps) {
  const smartBombsColor = "red";
  const hicsColor = "darkorange";
  const gateCampColor = "black";
  return (
    <Stack position="relative" {...props}>
      <Stack className="route__row">
        <Stack direction="row" zIndex={1} minHeight={15} width="100%">
          {route.route.map(
            (
              {
                index,
                solarSystemID,
                name,
                security,
                entry: {
                  smartBombs: entrySmartBombs,
                  hics: entryHics,
                  gateCamp: entryGateCamp,
                } = {},
                exit: {
                  smartBombs: exitSmartBombs,
                  hics: exitHics,
                  gateCamp: exitGateCamp,
                } = {},
              },
              arrIndex
            ) => (
              <Stack
                className="route__solar-system"
                position="relative"
                direction="row"
                width={`${100 / route.route.length}%`}
                height={15}
                key={`r2${name}${arrIndex}`}
                onMouseEnter={() => onSelectIndex(index)}
                onMouseLeave={() => onSelectIndex(-1)}
                sx={{ cursor: "pointer" }}
                onClick={() => onAvoid && onAvoid(solarSystemID, name)}
              >
                <Stack justifyContent="center" width="100%">
                  <Typography
                    position="absolute"
                    zIndex={5}
                    display={selectedIndex === index ? "block" : "none"}
                    fontWeight="bold"
                    fontSize="0.7em"
                    left="50%"
                    sx={{ transform: "translateX(-50%)" }}
                  >
                    AVOID
                  </Typography>
                </Stack>
                {entryGateCamp && (
                  <Tooltip title="Entry Gate">
                    <Box>
                      <Tick
                        className="gate-camp__entry"
                        direction="up-left"
                        color={
                          entrySmartBombs
                            ? smartBombsColor
                            : entryHics
                            ? hicsColor
                            : gateCampColor
                        }
                        position="absolute"
                        zIndex={4}
                        left={1}
                        width={4}
                        height={6}
                        bottom={-9}
                      />
                    </Box>
                  </Tooltip>
                )}
                {exitGateCamp && (
                  <Tooltip title="Exit Gate">
                    <Box>
                      <Tick
                        className="gate-camp__exit"
                        direction={"up-right"}
                        color={
                          exitSmartBombs
                            ? smartBombsColor
                            : exitHics
                            ? hicsColor
                            : gateCampColor
                        }
                        position="absolute"
                        zIndex={4}
                        right={1}
                        width={4}
                        height={6}
                        bottom={-9}
                      />
                    </Box>
                  </Tooltip>
                )}
                <Stack
                  position="absolute"
                  height="100%"
                  width="100%"
                  sx={{
                    background: getSecurityColor(security),
                  }}
                >
                  <Box
                    zIndex={4}
                    my="3px"
                    height="100%"
                    ml={arrIndex === 0 ? "3px" : 0}
                    width={`calc(100% - ${
                      arrIndex === route.route.length - 1 ? 3 : 0
                    }px)`}
                    sx={{
                      background: "white",
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  className="route__system"
                  height="100%"
                  width="100%"
                >
                  <Box
                    position="absolute"
                    zIndex={4}
                    height="100%"
                    left={-1}
                    width={
                      !showPosition || position > index
                        ? `calc(100% + 2px)`
                        : "0%"
                    }
                    sx={{
                      background: getSecurityColor(security),
                      transition: "width 0.5s",
                      transform: "scaleX(-1)",
                    }}
                  />
                </Stack>
              </Stack>
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RouteRendererBar;
