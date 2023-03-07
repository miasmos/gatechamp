import { Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSolarSystemSelector } from "../../recoil/kills";

type GateCampRendererTopInfoItemProps = RouteJumpSummary & {
  count: number;
  index: number;
  selectedIndex: number;
  alwaysShowOrigin: boolean;
  alwaysShowDestination: boolean;
};

function GateCampRendererTopInfoItem({
  count,
  index,
  selectedIndex,
  alwaysShowOrigin,
  alwaysShowDestination,
  name,
  solarSystemID,
}: GateCampRendererTopInfoItemProps) {
  const { kills } = useRecoilValue(getSolarSystemSelector(solarSystemID));
  return (
    <Stack
      width={`${100 / count}%`}
      sx={{
        opacity:
          (selectedIndex === index && kills === 0) ||
          (index === 0 && alwaysShowOrigin) ||
          (index === count - 1 && alwaysShowDestination)
            ? 1
            : 0,
      }}
      key={name}
      justifyContent="flex-end"
    >
      <Typography variant="body2" whiteSpace="nowrap">
        {name}
      </Typography>
    </Stack>
  );
}

export default GateCampRendererTopInfoItem;
