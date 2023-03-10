import { Box, BoxProps } from "@mui/material";
import { palette } from "../theme";

type ProgressCircleProps = {
  progress: number;
  size: number;
  thickness: number;
  direction?: "clockwise" | "counter-clockwise";
} & BoxProps;

function ProgressCircle({
  progress,
  size,
  thickness,
  direction = "clockwise",
  ...props
}: ProgressCircleProps) {
  const currentProgress = direction === "clockwise" ? progress : 1 - progress;
  return (
    <Box position="relative" width={size} height={size} {...props}>
      <Box
        position="relative"
        zIndex={1}
        borderRadius="50%"
        sx={{
          background: `conic-gradient(${palette.palette.primary.main} ${
            currentProgress * 100
          }%, rgb(255,255,255) ${currentProgress * 100}%)`,
        }}
        width={size}
        height={size}
      />
      <Box
        height={size - thickness}
        width={size - thickness}
        position="absolute"
        zIndex={2}
        borderRadius="50%"
        left="50%"
        top="50%"
        sx={{ transform: "translate(-50%,-50%)", background: "white" }}
      />
    </Box>
  );
}

export default ProgressCircle;
