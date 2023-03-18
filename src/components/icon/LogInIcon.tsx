/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent as Desktop } from "../../assets/login-with-eve-online.svg";
import { ReactComponent as Mobile } from "../../assets/login-with-eve-online-mobile.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledDesktopIcon = StyledCustomIcon(Desktop);
const StyledMobileIcon = StyledCustomIcon(Mobile);

const LogInIcon = forwardRef(
  (
    {
      color,
      width,
      ...props
    }: Omit<StackProps, "width"> & { width?: number | string },
    ref
  ) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    return (
      <Stack {...props} ref={ref as RefObject<HTMLDivElement>} sx={{}}>
        {isSm ? (
          <StyledMobileIcon color={color as string} width={width} />
        ) : (
          <StyledDesktopIcon color={color as string} width={width} />
        )}
      </Stack>
    );
  }
);

export default LogInIcon;
