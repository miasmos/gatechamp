/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject } from "react";
import { ReactComponent } from "../../assets/favicon.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledFavIcon = StyledCustomIcon(ReactComponent);

const FavIcon = forwardRef(
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
        <StyledFavIcon color={color as string} width={width} />
      </Stack>
    );
  }
);

export default FavIcon;
export { ReactComponent as BaseFavIcon };
