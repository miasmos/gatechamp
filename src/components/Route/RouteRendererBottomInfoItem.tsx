import { Box, Typography, Stack, Theme } from "@mui/material";
import { useRecoilValue } from "recoil";
import clsx from "clsx";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSolarSystemSelector } from "../../recoil/kills";
import SkullIcon from "../icon/SkullIcon";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import RocketIcon from "@mui/icons-material/Rocket";
import TungstenIcon from "@mui/icons-material/Tungsten";
import { useTheme } from "@emotion/react";
import Tooltip from "../Tooltip";

type RouteRendererBottomInfoItemProps = RouteJumpSummary & {
  alwaysShowTitle?: boolean;
  direction: "horizontal" | "vertical";
};

function RouteRendererBottomInfoItem({
  name,
  solarSystemID,
  alwaysShowTitle = false,
  direction = "horizontal",
}: RouteRendererBottomInfoItemProps) {
  const theme = useTheme() as Theme;
  const { kills, attackers, hics, smartBombs } = useRecoilValue(
    getSolarSystemSelector(solarSystemID)
  );
  return (
    <Box
      className={clsx({
        "route-renderer__bottom-info": true,
        "route-renderer__bottom-info--has-kills": kills > 0,
      })}
      width="100%"
      sx={{
        opacity: kills > 0 || alwaysShowTitle ? 1 : 0,
      }}
      key={name}
    >
      <Typography
        className="route-renderer__bottom-info__title"
        variant="body2"
        whiteSpace="nowrap"
        textAlign="center"
        sx={{
          opacity: alwaysShowTitle ? 1 : 0,
        }}
      >
        {name}
      </Typography>

      <Stack
        direction={direction === "vertical" ? "column" : "row"}
        justifyContent="center"
        mt={0.3}
        spacing={direction === "vertical" ? 0.2 : 0}
      >
        <Stack
          sx={{
            visibility: kills > 0 ? "visible" : "hidden",
            pointerEvents: kills > 0 ? "all" : "none",
          }}
          justifyContent="center"
          direction={direction === "vertical" ? "row" : "column"}
        >
          <Tooltip title={kills > 0 ? "Kills" : null}>
            <SkullIcon color={theme.palette.primary.main} />
          </Tooltip>
          <Typography variant="body2" fontSize={11}>
            {kills}
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          direction={direction === "vertical" ? "row" : "column"}
          sx={{
            visibility: kills > 0 ? "visible" : "hidden",
            pointerEvents: kills > 0 ? "all" : "none",
          }}
        >
          <Tooltip title={kills > 0 ? "Attackers" : null}>
            <RocketIcon sx={{ fontSize: 15 }} />
          </Tooltip>
          <Typography variant="body2" fontSize={11}>
            {attackers}
          </Typography>
        </Stack>
        <Stack display={hics ? "flex" : "none"} alignItems="center">
          <Tooltip title={kills > 0 ? "Heavy Interdiction Cruisers" : null}>
            <CallSplitIcon
              sx={{
                fontSize: 15,
              }}
              htmlColor={theme.palette.killSummary.hic}
            />
          </Tooltip>
        </Stack>
        <Stack display={smartBombs ? "flex" : "none"} alignItems="center">
          <Tooltip title={kills > 0 ? "Smart Bombs" : null}>
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
