import Button, { ButtonProps } from "@mui/material/Button";

function MainButton({ sx = {}, variant = "contained", ...props }: ButtonProps) {
  return (
    <Button
      sx={{ height: 60, width: 200, ...sx }}
      variant={variant}
      {...props}
    />
  );
}

export default MainButton;
