import { useTheme } from "@emotion/react";
import { Tooltip, Box, Theme } from "@mui/material";
import { ComponentProps } from "react";
import { useRecoilValue } from "recoil";
import { getStargateSelector } from "../../recoil/kills";
import Tick from "./Tick";

type RouteRendererTickProps = {
  stargateId: number;
  title: string;
  direction: ComponentProps<typeof Tick>["direction"];
  type: "entry" | "exit";
};

function RouteRendererTick({
  stargateId,
  title,
  direction,
  type,
}: RouteRendererTickProps) {
  const theme = useTheme() as Theme;
  const { smartBombs, hics, gateCamp } = useRecoilValue(
    getStargateSelector(stargateId)
  );

  if (!gateCamp) {
    return null;
  }

  const { killSummary } = theme.palette;
  const color = smartBombs
    ? killSummary.smartBomb
    : hics
    ? killSummary.hic
    : killSummary.gateCamp;
  return (
    <Tooltip title={title}>
      <Box>
        <Tick
          color={color}
          className={`gate-camp__${type} gate-camp-id__${stargateId}`}
          direction={direction}
          position="absolute"
          zIndex={4}
          left={type === "entry" ? 1 : "initial"}
          right={type === "exit" ? 1 : "initial"}
          width={4}
          height={6}
          bottom={-9}
        />
      </Box>
    </Tooltip>
  );
}

export default RouteRendererTick;