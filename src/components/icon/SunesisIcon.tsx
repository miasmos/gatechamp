/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/sunesis.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledSunesisIcon = StyledCustomIcon(ReactComponent);

const SunesisIcon = forwardRef(
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
        <StyledSunesisIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default SunesisIcon;
