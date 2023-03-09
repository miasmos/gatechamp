/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/miasmos.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledMiasmosIcon = StyledCustomIcon(ReactComponent);

const MiasmosIcon = forwardRef(
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
        <StyledMiasmosIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default MiasmosIcon;
