import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ComponentProps, useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import ProgressCircle from "./ProgressCircle";

type ProgressTimerProps = {
  minutes: number;
  hideProgress?: boolean;
} & Omit<ComponentProps<typeof ProgressCircle>, "progress">;

type ProgressTimerState = {
  started: boolean;
  timeLeft: number;
};

function ProgressTimer({
  minutes,
  size,
  hideProgress = false,
  ...props
}: ProgressTimerProps) {
  const [{ timeLeft, started }, setState] = useState<ProgressTimerState>({
    started: false,
    timeLeft: minutes * 60,
  });
  const setTimerState = (nextState: Partial<ProgressTimerState>) =>
    setState((state) => ({ ...state, ...nextState }));

  useEffect(() => {
    setTimerState({ started: true });
  }, []);

  useInterval(
    () => setTimerState({ timeLeft: timeLeft - 1 }),
    started && timeLeft > 0 ? 1000 : null
  );

  const minutesLeft = Math.floor(timeLeft / 60);
  let secondsLeft = (timeLeft % 60).toString();
  secondsLeft = secondsLeft.length === 1 ? `0${secondsLeft}` : secondsLeft;

  return (
    <Box position="relative" width={size}>
      {!hideProgress && (
        <ProgressCircle
          progress={timeLeft / (minutes * 60)}
          size={size}
          zIndex={1}
          {...props}
        />
      )}
      <Typography
        fontSize={`${size / 70}rem`}
        position={hideProgress ? "relative" : "absolute"}
        zIndex={2}
        variant="body2"
        top={hideProgress ? "0" : "50%"}
        left={hideProgress ? "0" : "50%"}
        sx={{ transform: hideProgress ? "" : "translate(-50%,-50%)" }}
      >
        {minutesLeft}:{secondsLeft}
      </Typography>
    </Box>
  );
}

export default ProgressTimer;
