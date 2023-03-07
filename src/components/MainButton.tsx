import Button, { ButtonProps } from "@mui/material/Button";

function MainButton({ sx = {}, variant = "outlined", ...props }: ButtonProps) {
  return (
    <Button
      sx={{
        height: 60,
        width: 200,
        borderWidth: 2,
        borderColor: "#fff",
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
