/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/login-with-eve-online.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledLogInIcon = StyledCustomIcon(ReactComponent);

const LogInIcon = forwardRef(
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
        <StyledLogInIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default LogInIcon;
