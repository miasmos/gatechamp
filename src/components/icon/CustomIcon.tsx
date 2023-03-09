import { styled } from "@mui/material";

const StyledCustomIcon = (
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) =>
  styled(icon)(({ color }) => ({
    ".st1": {
      stroke: color,
    },
    ".st2": {
      fill: color,
    },
  }));

export default StyledCustomIcon;
