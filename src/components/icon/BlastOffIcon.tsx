/// <reference types="vite-plugin-svgr/client" />
import { CSSTransition } from "react-transition-group";
import { Stack, StackProps } from "@mui/material";
import { forwardRef, RefObject, useEffect, useState } from "react";
import { ReactComponent } from "../../assets/favicon-vertical.svg";
import StyledCustomIcon from "./CustomIcon";

const StyledBlastOff = StyledCustomIcon(ReactComponent);

const BlastOff = forwardRef(
  (
    {
      color,
      width,
      animate = true,
      duration = 500,
      sx = {},
      ...props
    }: Omit<StackProps, "width"> & {
      width?: number | string;
      animate?: boolean;
      duration?: number;
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const enterAnimation = () => setShow(true);
    const exitAnimation = () => setShow(false);

    useEffect(() => {
      if (animate) {
        enterAnimation();
      }
    }, []);

    return (
      <CSSTransition
        timeout={duration}
        classNames="blast-off-animation"
        in={show}
        onExited={enterAnimation}
        onEntered={exitAnimation}
      >
        <Stack
          {...props}
          ref={ref as RefObject<HTMLDivElement>}
          sx={{
            "&.blast-off-animation-enter": {
              "#blast-off-fire-middle, #blast-off-fire-right, #blast-off-fire-left":
                {
                  height: 0,
                  y: 75.3,
                },
            },
            "&.blast-off-animation-enter-active": {
              "#blast-off-fire-middle, #blast-off-fire-right, #blast-off-fire-left":
                {
                  height: 24.6,
                  transition: `height ${duration * 0.66}ms ease-in-out, y ${
                    duration * 0.66
                  }ms linear`,
                },
            },
            "&.blast-off-animation-exit": {
              "#blast-off-fire-middle, #blast-off-fire-right, #blast-off-fire-left":
                {
                  height: 24.6,
                  y: 75.3,
                },
            },
            "&.blast-off-animation-exit-active": {
              "#blast-off-fire-middle, #blast-off-fire-right, #blast-off-fire-left":
                {
                  height: 0,
                  y: 99.9,
                  transition: `height ${duration * 0.33}ms  ease-in-out, y ${
                    duration * 0.33
                  }ms  ease-in-out`,
                },
            },
            ...sx,
          }}
        >
          <StyledBlastOff color={color as string} width={width} />
        </Stack>
      </CSSTransition>
    );
  }
);

export default BlastOff;
