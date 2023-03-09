import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

function Tooltip(props: TooltipProps) {
  return <MuiTooltip arrow {...props} />;
}

export default Tooltip;
