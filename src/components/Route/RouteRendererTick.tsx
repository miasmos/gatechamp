import { Tooltip, Box } from "@mui/material";
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
  const { smartBombs, hics, gateCamp } = useRecoilValue(
    getStargateSelector(stargateId)
  );
  const smartBombsColor = "red";
  const hicsColor = "darkorange";
  const gateCampColor = "black";

  if (!gateCamp) {
    return null;
  }

  return (
    <Tooltip title={title}>
      <Box>
        <Tick
          className={`gate-camp__${type}`}
          direction={direction}
          color={
            smartBombs ? smartBombsColor : hics ? hicsColor : gateCampColor
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
  );
}

export default RouteRendererTick;
