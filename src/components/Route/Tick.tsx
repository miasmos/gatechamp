import { Box, BoxProps } from "@mui/material";

type TickProps = {
  direction: "up-left" | "up-right" | "down-left" | "down-right";
} & BoxProps;

function Tick({
  className,
  width,
  height,
  color,
  direction,
  ...props
}: TickProps) {
  let borderTop: string = "none",
    borderRight: string = "none",
    borderLeft: string = "none",
    borderBottom: string = "none";

  if (direction === "up-left") {
    borderRight = `${width}px solid transparent`;
    borderTop = `${height}px solid ${color}`;
  } else if (direction === "up-right") {
    borderLeft = `${width}px solid transparent`;
    borderTop = `${height}px solid ${color}`;
  } else if (direction === "down-left") {
    borderLeft = `${width}px solid ${color}`;
    borderTop = `${height}px solid transparent`;
  } else if (direction === "down-right") {
    borderRight = `${width}px solid ${color}`;
    borderTop = `${height}px solid transparent`;
  }
  return (
    <Box
      className={`${className} tick__${direction}`}
      position="absolute"
      width={0}
      height={0}
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
      borderRight={borderRight}
      {...props}
    />
  );
}

export default Tick;
