import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import ClearIcon from "@mui/icons-material/Clear";

type ModalProps = {
  title?: ReactElement;
  actions: ReactElement;
  close: () => void;
} & Omit<MuiModalProps, "title">;

const ModalActions = ({ children }: { children: ReactElement }) => children;

const ModalTitle = ({
  children,
}: {
  children: ReactElement | string | string[];
}) => (
  <Typography variant="h3" align="left">
    {children}
  </Typography>
);

function Modal({ children, title, actions, close, ...props }: ModalProps) {
  return (
    <MuiModal
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onClose={close}
    >
      <Paper sx={{ minWidth: 400, px: 5, py: 7, outline: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          {title && <Stack mb={5}>{title}</Stack>}
          {!title && <Stack />}
          <Stack alignItems="center" direction="column" justifyContent="center">
            <ClearIcon sx={{ cursor: "pointer" }} onClick={close} />
          </Stack>
        </Stack>
        <Stack>{children}</Stack>
        <Stack mt={6} alignItems="center" spacing={2}>
          {actions}
        </Stack>
      </Paper>
    </MuiModal>
  );
}

export default Modal;
export { ModalActions, ModalTitle };
