import { Box, Typography, Stack, Tooltip, Theme } from "@mui/material";
import { useRecoilValue } from "recoil";
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
  selectedIndex: number;
  alwaysShowDestination: boolean;
  alwaysShowOrigin: boolean;
};

function RouteRendererBottomInfoItem({
  name,
  count,
  index,
  selectedIndex,
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
  return (
    <Box
      width={`${100 / count}%`}
      sx={{
        opacity: kills > 0 ? 1 : 0,
      }}
      key={name}
    >
      <Typography
        variant="body2"
        whiteSpace="nowrap"
        sx={{
          display: displayTitle ? "block" : "none",
        }}
      >
        {name}
      </Typography>

      <Stack direction="row" justifyContent="center" mt={0.3}>
        <Stack
          sx={{
            visibility: kills > 0 ? "visible" : "hidden",
            pointerEvents: kills > 0 ? "all" : "none",
          }}
        >
          <Tooltip title="Kills">
            <SkullIcon color="white" />
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
              htmlColor={theme.palette.killSummary.hic}
            />
          </Tooltip>
        </Stack>
        <Stack display={smartBombs ? "flex" : "none"}>
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
