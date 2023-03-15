import { Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Typography from "@mui/material/Typography";
import MainButton from "../MainButton";
import { useNavigate } from "react-router-dom";
import { isSubscribedSetter } from "../../recoil/user";
import { useSetRecoilState } from "recoil";
import userState from "../../recoil/user/atom";

enum CheckoutStatus {
  Waiting,
  Success,
  Failure,
}

type CheckoutStatusStateProps = {
  status: CheckoutStatus;
};

function CheckoutStatusState({ status }: CheckoutStatusStateProps) {
  const setUserState = useSetRecoilState(userState);
  const setIsSubscribed = isSubscribedSetter(setUserState);
  const navigate = useNavigate();
  let Icon = CheckCircleOutlineIcon;
  let message = "";
  let message2 = "";
  let actionMessage = "";
  const isComplete = status !== CheckoutStatus.Waiting;

  const onActionClick = () => {
    if (status === CheckoutStatus.Success) {
      setIsSubscribed(true);
      navigate(`../..`);
    } else if (status === CheckoutStatus.Failure) {
      navigate("..");
    }
  };

  switch (status) {
    case CheckoutStatus.Success:
      Icon = CheckCircleOutlineIcon;
      message = "Success!";
      message2 = "Thank you for your purchase.";
      actionMessage = "Nice";
      break;
    case CheckoutStatus.Waiting:
      Icon = SyncIcon;
      message = "Processing";
      break;
    case CheckoutStatus.Failure:
      Icon = ErrorOutlineIcon;
      message = "There was an issue with your payment.";
      message2 = "Your card has not been charged.";
      actionMessage = "Try Again";
      break;
  }

  return (
    <Stack justifyContent="center" width="100%">
      <Stack justifyContent="center" direction="row">
        <Icon
          sx={{
            "@keyframes loading": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
            animation:
              status === CheckoutStatus.Waiting ? `loading 0.8s infinite` : "",
            fontSize: "10rem",
          }}
        />
      </Stack>
      <Stack>
        <Typography>{message}</Typography>
        <Typography>{message2}</Typography>
      </Stack>
      <Stack justifyContent="center" direction="row" mt={8}>
        <MainButton
          sx={{ visibility: isComplete ? "visible" : "hidden" }}
          onClick={onActionClick}
        >
          {actionMessage}
        </MainButton>
      </Stack>
    </Stack>
  );
}

export default CheckoutStatusState;
export { CheckoutStatus };
