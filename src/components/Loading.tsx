import Stack from "@mui/material/Stack/Stack";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import LoadingAnimation from "./LoadingAnimation";

type LoadingProps = {
  waitMs?: number;
};

function Loading({ waitMs = 1000 }: LoadingProps) {
  const [elapsed, setElapsed] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useInterval(
    () => {
      setElapsed(elapsed + 100);
      if (elapsed + 100 >= waitMs) {
        setShowAnimation(true);
      }
    },
    elapsed < waitMs ? 100 : null
  );

  return (
    <Stack
      width="100%"
      justifyContent="center"
      alignItems="center"
      sx={{ opacity: showAnimation ? 1 : 0, transition: "opacity 0.2s" }}
    >
      <LoadingAnimation />
    </Stack>
  );
}

export default Loading;
