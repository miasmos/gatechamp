/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/skull.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledSkullIcon = StyledCustomIcon(ReactComponent);

const SkullIcon = forwardRef(
  (
    {
      color,
      width = 15,
      ...props
    }: Omit<StackProps, "width"> & { width?: number },
    ref
  ) => {
    return (
      <Stack {...props} ref={ref as RefObject<HTMLDivElement>}>
        <StyledSkullIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default SkullIcon;
