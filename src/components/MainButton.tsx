import Button, { ButtonProps } from "@mui/material/Button";
import { palette } from "../theme";

function MainButton({ sx = {}, variant = "outlined", ...props }: ButtonProps) {
  return (
    <Button
      sx={{
        height: 60,
        width: 200,
        borderWidth: 2,
        borderColor: palette.palette.primary.main,
        ":hover": {
          borderWidth: 2,
        },
        ...sx,
      }}
      variant={variant}
      {...props}
    />
  );
}

export default MainButton;
