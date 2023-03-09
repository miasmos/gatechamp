/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps, styled } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/skull.svg";

const StyledSkullIcon = styled(ReactComponent)(({ color }) => ({
  ".st1": {
    stroke: color,
  },
  ".st2": {
    fill: color,
  },
}));

const SkullIcon = forwardRef(({ color, ...props }: StackProps, ref) => {
  return (
    <Stack {...props} ref={ref as RefObject<HTMLDivElement>}>
      <StyledSkullIcon color={color as string} width={15} />
    </Stack>
  );
});

export default SkullIcon;
