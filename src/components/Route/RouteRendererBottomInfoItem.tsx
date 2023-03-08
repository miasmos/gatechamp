import { Box, Typography, Stack, Tooltip, Theme } from "@mui/material";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSolarSystemSelector } from "../../recoil/kills";
import SkullIcon from "../icon/SkullIcon";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import RocketIcon from "@mui/icons-material/Rocket";
import TungstenIcon from "@mui/icons-material/Tungsten";
import { useTheme } from "@emotion/react";

type RouteRendererBottomInfoItemProps = RouteJumpSummary & {
  count: number;
  index: number;
  alwaysShowDestination: boolean;
  alwaysShowOrigin: boolean;
};

function RouteRendererBottomInfoItem({
  name,
  count,
  index,
  solarSystemID,
  alwaysShowDestination,
  alwaysShowOrigin,
}: RouteRendererBottomInfoItemProps) {
  const theme = useTheme() as Theme;
  const { kills, attackers, hics, smartBombs } = useRecoilValue(
    getSolarSystemSelector(solarSystemID)
  );
  const displayTitle =
    (!(alwaysShowOrigin && index === 0) &&
      !(alwaysShowDestination && index === count - 1) &&
      kills > 0) ||
    kills === 0;
  const verticalKillThreshold = 20;
  return (
    <Box
      className={clsx({
        "route-renderer__bottom-info": true,
        "route-renderer__bottom-info--has-kills": kills > 0,
      })}
      width="100%"
      sx={{
        opacity: kills > 0 ? 1 : 0,
      }}
      key={name}
    >
      <Typography
        className="route-renderer__bottom-info__title"
        variant="body2"
        whiteSpace="nowrap"
        sx={{
          display: displayTitle ? "block" : "none",
        }}
      >
        {name}
      </Typography>

      <Stack
        direction={count > verticalKillThreshold ? "column" : "row"}
        justifyContent="center"
        mt={0.3}
        spacing={count > verticalKillThreshold ? 0.2 : 0}
      >
        <Stack
          sx={{
            visibility: kills > 0 ? "visible" : "hidden",
            pointerEvents: kills > 0 ? "all" : "none",
          }}
          justifyContent="center"
          direction={count > verticalKillThreshold ? "row" : "column"}
        >
          <Tooltip title="Kills">
            <SkullIcon color="white" />
          </Tooltip>
          <Typography variant="body2" fontSize={11}>
            {kills}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          direction={count > verticalKillThreshold ? "row" : "column"}
        >
          <Tooltip title="Attackers">
            <RocketIcon sx={{ fontSize: 15 }} />
          </Tooltip>
          <Typography variant="body2" fontSize={11}>
            {attackers}
          </Typography>
        </Stack>
        <Stack display={hics ? "flex" : "none"} alignItems="center">
          <Tooltip title="Heavy Interdiction Cruisers">
            <CallSplitIcon
              sx={{
                fontSize: 15,
              }}
              htmlColor={theme.palette.killSummary.hic}
            />
          </Tooltip>
        </Stack>
        <Stack display={smartBombs ? "flex" : "none"} alignItems="center">
          <Tooltip title="Smart Bombs">
            <TungstenIcon
              sx={{ fontSize: 15 }}
              htmlColor={theme.palette.killSummary.smartBomb}
            />
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}

export default RouteRendererBottomInfoItem;
