import { Box, Stack, Typography, StackProps } from "@mui/material";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSecurityColor } from "../../util/eveTrade";
import RouteRendererTick from "./RouteRendererTick";

type RouteRendererProps = {
  route: RouteJumpSummary[];
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
  return (
    <Stack position="relative" {...props}>
      <Stack className="route__row">
        <Stack direction="row" zIndex={1} minHeight={15} width="100%">
          {route.map(
            ({ solarSystemID, name, security, entry, exit }, arrIndex) => (
              <Stack
                className="route__solar-system"
                position="relative"
                direction="row"
                width={`${100 / route.length}%`}
                height={15}
                key={name}
                onMouseEnter={() => onSelectIndex(arrIndex)}
                onMouseLeave={() => onSelectIndex(-1)}
                sx={{ cursor: "pointer" }}
                onClick={() => onAvoid && onAvoid(solarSystemID, name)}
              >
                <Stack justifyContent="center" width="100%">
                  <Typography
                    position="absolute"
                    zIndex={5}
                    display={selectedIndex === arrIndex ? "block" : "none"}
                    fontWeight="bold"
                    fontSize="0.7em"
                    left="50%"
                    sx={{ transform: "translateX(-50%)" }}
                  >
                    AVOID
                  </Typography>
                </Stack>
                <RouteRendererTick
                  type="entry"
                  direction="up-left"
                  title="Entry Gate Camp"
                  stargateId={entry}
                />
                <RouteRendererTick
                  type="exit"
                  direction="up-right"
                  title="Exit Gate Camp"
                  stargateId={exit}
                />
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
                      arrIndex === route.length - 1 ? 3 : 0
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
                      !showPosition || position > arrIndex
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
