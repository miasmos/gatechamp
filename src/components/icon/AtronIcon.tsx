/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/atron.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledAtronIcon = StyledCustomIcon(ReactComponent);

const AtronIcon = forwardRef(
  (
    {
      color,
      width,
      ...props
    }: Omit<StackProps, "width"> & { width?: number | string },
    ref
  ) => {
    return (
      <Stack {...props} ref={ref as RefObject<HTMLDivElement>}>
        <StyledAtronIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default AtronIcon;
