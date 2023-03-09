import { Stack, Typography } from "@mui/material";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import { getSolarSystemSelector } from "../../recoil/kills";

type GateCampRendererTopInfoItemProps = RouteJumpSummary & {
  alwaysShowTitle?: boolean;
};

function GateCampRendererTopInfoItem({
  name,
  alwaysShowTitle,
  solarSystemID,
}: GateCampRendererTopInfoItemProps) {
  const { kills } = useRecoilValue(getSolarSystemSelector(solarSystemID));
  return (
    <Stack
      width="100%"
      className={clsx({
        "route__info-top-item": true,
        "route__info-top-item--has-kills": kills > 0,
        "route__info-top-item--always-show-title": alwaysShowTitle,
      })}
      sx={{
        opacity: alwaysShowTitle ? 1 : 0,
      }}
      key={name}
      justifyContent="center"
      direction="row"
    >
      <Typography
        variant="body2"
        whiteSpace="nowrap"
        className="route__info-top-item__title"
      >
        {name}
      </Typography>
    </Stack>
  );
}

export default GateCampRendererTopInfoItem;
