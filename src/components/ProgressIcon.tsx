import { Box, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import CheckIcon from "@mui/icons-material/Check";
import ProgressCircle from "./ProgressCircle";

type ProgressIconProps = {
  progress: number;
  cooldownProgress: number;
  isOnCooldown: boolean;
  isInProgress: boolean;
  thickness?: number;
  onClick?: () => void;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  size?: number;
};

function ProgressIcon({
  onClick,
  progress,
  cooldownProgress,
  isOnCooldown,
  isInProgress,
  thickness = 5,
  size = 24,
  icon: Icon,
}: ProgressIconProps) {
  return (
    <Box width={size} height={size} position="relative">
      <ProgressCircle
        progress={0.6}
        size={size - 4}
        thickness={thickness}
        sx={{
          "@keyframes spin": {
            from: {
              transform: "translate(-50%,-50%) rotate(0deg)",
            },
            to: {
              transform: "translate(-50%,-50%) rotate(360deg)",
            },
          },
          transform: "translate(-50%,-50%)",
          transition: "opacity 0.2s",
          opacity: isInProgress ? 1 : 0,
          animation: "spin 0.9s infinite",
        }}
        position="absolute"
        zIndex={1}
        left="50%"
        top="50%"
      />
      <CheckIcon
        sx={{
          position: "absolute",
          zIndex: 3,
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%",
          transition: "opacity 0.1s",
          pointerEvents: "none",
          opacity: isOnCooldown && !isInProgress ? 1 : 0,
        }}
      />
      <Icon
        sx={{
          cursor: !isOnCooldown && !isInProgress ? "pointer" : "default",
          opacity: !isInProgress && !isOnCooldown ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 2,
          position: "relative",
          pointerEvents: !isOnCooldown && !isInProgress ? "pointer" : "default",
        }}
        onClick={onClick}
      />
    </Box>
  );
}

export default ProgressIcon;
