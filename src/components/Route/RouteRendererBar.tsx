import { Box, Stack, Typography, StackProps } from "@mui/material";
import clsx from "clsx";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSecurityColor } from "../../util/eve";
import RouteRendererTick from "./RouteRendererTick";

type RouteRendererProps = {
  node: RouteJumpSummary;
  index: number;
  count: number;
  showPosition?: boolean;
  canAvoid?: boolean;
  onAvoid: (solarSystemID: number, name: string) => void;
} & Omit<StackProps, "position">;

function RouteRendererBar({
  node: { solarSystemID, name, security, entry, exit },
  count,
  index,
  onAvoid,
  canAvoid = true,
  ...props
}: RouteRendererProps) {
  return (
    <Stack
      className={clsx({
        "route-renderer__bar": true,
        "route-renderer__bar--no-avoid": !canAvoid,
      })}
      {...props}
      width="100%"
    >
      <Stack direction="row" zIndex={1} minHeight={15}>
        <Stack
          className="route__solar-system"
          position="relative"
          direction="row"
          height={15}
          width="100%"
          key={name}
          onClick={() => canAvoid && onAvoid && onAvoid(solarSystemID, name)}
        >
          <Stack justifyContent="center" width="100%">
            <Box
              sx={{ background: getSecurityColor(security) }}
              height="100%"
              width="calc(100%-2px)"
              ml="1px"
            />
            {canAvoid && (
              <Typography
                position="absolute"
                zIndex={5}
                fontWeight="bold"
                fontSize="0.7em"
                left="50%"
                display="none"
                sx={{ transform: "translateX(-50%)" }}
                className="route-renderer__bar__avoid-text"
              >
                AVOID
              </Typography>
            )}
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
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RouteRendererBar;
