import { Box, Typography, Stack, Tooltip } from "@mui/material";
import { useRecoilValue } from "recoil";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import {
  getSolarSystemSelector,
  getStargateSelector,
} from "../../recoil/kills";
import SkullIcon from "../icon/SkullIcon";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import RocketIcon from "@mui/icons-material/Rocket";
import TungstenIcon from "@mui/icons-material/Tungsten";

type RouteRendererBottomInfoItemProps = RouteJumpSummary & {
  count: number;
  index: number;
  previousSolarSystemId: number | undefined;
};

function RouteRendererBottomInfoItem({
  name,
  index,
  count,
  entry,
  exit,
  solarSystemID,
  previousSolarSystemId,
}: RouteRendererBottomInfoItemProps) {
  const { kills: previousKills } = useRecoilValue(
    getSolarSystemSelector(previousSolarSystemId)
  );
  const { gateCamp, kills, attackers, hics, smartBombs } = useRecoilValue(
    getSolarSystemSelector(solarSystemID)
  );
  const { gateCamp: entryGateCamp } = useRecoilValue(
    getStargateSelector(entry)
  );
  const { gateCamp: exitGateCamp } = useRecoilValue(getStargateSelector(exit));
  return (
    <Box
      width={`${100 / count}%`}
      sx={{
        opacity: gateCamp ? 1 : 0,
      }}
      key={name}
    >
      <Typography
        variant="body2"
        whiteSpace="nowrap"
        sx={{
          visibility:
            kills > 0 && (index === 0 || previousKills === 0)
              ? "visible"
              : "none",
          pointerEvents: kills > 0 ? "all" : "none",
        }}
      >
        {name}
      </Typography>

      <Stack direction={exitGateCamp && !entryGateCamp ? "row-reverse" : "row"}>
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
  );
}

export default RouteRendererBottomInfoItem;
