/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/logo.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledLogoIcon = StyledCustomIcon(ReactComponent);

const LogoIcon = forwardRef(
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
        <StyledLogoIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default LogoIcon;
