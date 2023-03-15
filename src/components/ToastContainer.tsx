import { Stack, styled, Typography } from "@mui/material";
import {
  ToastContainer as Container,
  ToastContentProps,
  ToastPromiseParams,
} from "react-toastify";
import { palette } from "../theme";
import { BaseFavIcon } from "./icon/FavIcon";

const StyledToastContainer = styled(Container)(() => ({
  ".Toastify__toast": {
    color: palette.palette.primary.contrastText,
    background: palette.palette.primary.main,
    padding: "15px",
  },
  ".Toastify__close-button": {
    color: palette.palette.primary.contrastText,
    opacity: 1,
  },
  ".Toastify__toast-icon": {
    width: 50,
    marginRight: 15,
  },
}));

const Toast = ({ toastProps: { data } }: ToastContentProps) => (
  <Stack>
    <Stack>
      <Typography variant="h6" mb={-0.3} align="left">
        {(data! as any).title}
      </Typography>
    </Stack>
    <Stack>
      <Typography variant="body2" align="left">
        {(data! as any).body}
      </Typography>
    </Stack>
  </Stack>
);

const ToastContainer = (
  <StyledToastContainer
    limit={5}
    newestOnTop
    position="bottom-right"
    icon={<BaseFavIcon />}
    hideProgressBar
    autoClose={120000}
  />
);

export default ToastContainer;
export { Toast };
