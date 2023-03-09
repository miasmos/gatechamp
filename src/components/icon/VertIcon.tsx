/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/vert.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledVertIcon = StyledCustomIcon(ReactComponent);

const VertIcon = forwardRef(
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
        <StyledVertIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default VertIcon;
