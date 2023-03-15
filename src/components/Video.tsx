import { Box, BoxProps } from "@mui/material";

type VideoProps = {
  src: string;
} & BoxProps;

function Video({ src, ...props }: VideoProps) {
  return (
    <Box {...props}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        width="100%"
        height="100%"
      />
    </Box>
  );
}

export default Video;
