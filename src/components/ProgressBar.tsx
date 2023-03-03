import { Box, Stack, StackProps, styled } from "@mui/material";

type ProgressBarProps = {
  progress: number;
} & StackProps;

const StyledProgressBar = styled(Stack)(({ theme }) => ({
  ".progress-bar__border, .progress-bar__bar": {
    color: theme.palette.text.primary,
  },
  ".progress-bar__border": {
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: 6,
  },
  ".progress-bar__bar": {
    transition: "0.5s width",
    borderRadius: 6,
    background: theme.palette.text.primary,
  },
}));

function ProgressBar({ progress, ...props }: ProgressBarProps) {
  return (
    <StyledProgressBar position="relative" {...props}>
      <Box
        className="progress-bar__border"
        width="100%"
        height="100%"
        zIndex={1}
      />
      <Box
        className="progress-bar__bar"
        width="100%"
        height="100%"
        position="absolute"
        zIndex={2}
        sx={{
          width: `${progress * 100}%`,
        }}
      />
    </StyledProgressBar>
  );
}

export default ProgressBar;
