/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/crane.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledCraneIcon = StyledCustomIcon(ReactComponent);

const CraneIcon = forwardRef(
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
        <StyledCraneIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default CraneIcon;
