/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/astero.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledAsteroIcon = StyledCustomIcon(ReactComponent);

const AsteroIcon = forwardRef(
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
        <StyledAsteroIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default AsteroIcon;
