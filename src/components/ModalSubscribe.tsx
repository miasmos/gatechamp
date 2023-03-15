import { Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { WEBSITE_NAME } from "../constants";
import { AppRoute } from "../enum";
import { ModalSubscribeFeature } from "../recoil/modal/atom";
import Link from "./Link";
import MainButton from "./MainButton";
import Modal, { ModalActions } from "./Modal";
import Video from "./Video";

type ModalSubscribeProps = {
  feature?: ModalSubscribeFeature;
} & Pick<ComponentProps<typeof Modal>, "close" | "open">;

function ModalSubscribe({
  feature = ModalSubscribeFeature.None,
  close,
  ...props
}: ModalSubscribeProps) {
  const navigate = useNavigate();
  let video;

  const onButtonClick = () => {
    close();
    navigate(AppRoute.Premium);
  };

  switch (feature) {
    case ModalSubscribeFeature.LocationTracking:
      video = (
        <Video
          src="/feature-2.mp4"
          width={200}
          height={100}
          borderRadius={1}
          overflow="hidden"
        />
      );
      break;
    case ModalSubscribeFeature.Notifications:
      video = (
        <Video
          src="/feature-3.webm"
          width={200}
          height={100}
          borderRadius={1}
          overflow="hidden"
        />
      );
      break;
    case ModalSubscribeFeature.RouteCharting:
      video = (
        <Video
          src="/feature-1.webm"
          width={200}
          height={100}
          borderRadius={1}
          overflow="hidden"
        />
      );
      break;
  }

  return (
    <Modal
      {...props}
      close={close}
      actions={
        <ModalActions>
          <MainButton onClick={onButtonClick}>Learn More</MainButton>
        </ModalActions>
      }
    >
      <Stack>
        <Typography variant="h2" fontSize="5rem" lineHeight={0.7}>
          Fly safe
        </Typography>
        <Typography variant="h5" mt={0.1}>
          with {WEBSITE_NAME} premium
        </Typography>
        <Stack direction="column" alignItems="center" mt={5}>
          {video}
        </Stack>
        <Typography mt={3}>This feature and more await you!</Typography>
      </Stack>
    </Modal>
  );
}

export default ModalSubscribe;
