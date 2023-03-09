import { Box, Stack } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { ReactElement, useEffect, useRef, useState } from "react";
import { randomIndexFromArray } from "../util/array";
import {
  AsteroIcon,
  BustardIcon,
  CraneIcon,
  MiasmosIcon,
  SunesisIcon,
  VertIcon,
  AtronIcon,
} from "./icon";
import { palette } from "../theme";

type LoadingAnimationProps = {
  duration?: number;
  scale?: number;
};

const icons = [
  AsteroIcon,
  BustardIcon,
  CraneIcon,
  MiasmosIcon,
  SunesisIcon,
  AtronIcon,
];

function LoadingAnimation({
  scale = 1,
  duration = 1200,
}: LoadingAnimationProps) {
  const [{ shipIcon, show, array }, setState] = useState<{
    shipIcon: ReactElement | null;
    array: typeof AsteroIcon[];
    show: boolean;
  }>({
    shipIcon: null,
    array: icons.slice(),
    show: false,
  });
  const nodeRef = useRef(null);

  const nextIcon = (show: boolean) => {
    let nextArray = array.slice();
    const index = randomIndexFromArray(nextArray);
    const NextIcon = nextArray.splice(index, 1)[0];
    if (nextArray.length === 0) {
      nextArray = icons.slice();
    }
    setState((state) => ({
      ...state,
      show,
      shipIcon: (
        <NextIcon
          width="90%"
          color={palette.palette.primary.main}
          alignItems="center"
        />
      ),
      array: nextArray,
    }));
  };

  useEffect(() => {
    nextIcon(true);
  }, []);

  const enterAnimation = () => nextIcon(true);
  const exitAnimation = () => setState((state) => ({ ...state, show: false }));

  return (
    <Box>
      <CSSTransition
        nodeRef={nodeRef}
        timeout={duration}
        classNames="loading-animation"
        in={show}
        onExited={enterAnimation}
        onEntered={exitAnimation}
      >
        <Box
          ref={nodeRef}
          width={200 * scale}
          height={90 * scale}
          position="relative"
          overflow="hidden"
          sx={{
            "&.loading-animation-enter": {
              ".loading-animation__ship": {
                transform: "translate(-100%, -50%)",
              },
            },
            "&.loading-animation-enter-active": {
              ".loading-animation__ship": {
                transform: "translate(0%, -50%)",
                transition: "transform 300ms ease-in-out",
              },
            },
            "&.loading-animation-exit": {
              ".loading-animation__ship": {
                transform: "translate(0%, -50%)",
              },
            },
            "&.loading-animation-exit-active": {
              ".loading-animation__ship": {
                transform: "translate(100%, -50%)",
                transition: "transform 200ms ease-in",
              },
            },
          }}
        >
          <Stack
            justifyContent="space-between"
            direction="row"
            position="relative"
            sx={{ zIndex: 2 }}
          >
            <VertIcon
              className="loading-animation__left"
              width={6 * scale}
              style={{ marginLeft: "-1px" }}
              color={palette.palette.primary.main}
            />
            <VertIcon
              className="loading-animation__right"
              width={6 * scale}
              style={{ marginRight: "-1px" }}
              color={palette.palette.primary.main}
            />
          </Stack>
          <Box
            className="loading-animation__ship"
            position="absolute"
            top="50%"
            sx={{ transform: "translate(-100%, -50%)" }}
          >
            {shipIcon}
          </Box>
        </Box>
      </CSSTransition>
    </Box>
  );
}

export default LoadingAnimation;
