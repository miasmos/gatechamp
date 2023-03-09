/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/bustard.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledBustardIcon = StyledCustomIcon(ReactComponent);

const BustardIcon = forwardRef(
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
        <StyledBustardIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default BustardIcon;
