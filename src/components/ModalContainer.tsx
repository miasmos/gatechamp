import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { subscribeModalSetter } from "../recoil/modal";
import modalState from "../recoil/modal/atom";
import ModalSubscribe from "./ModalSubscribe";

function ModalContainer() {
  const [{ subscribe }, setModalState] = useRecoilState(modalState);
  const setSubscribe = subscribeModalSetter(setModalState);

  const closeSubscribeModal = useCallback(() => setSubscribe(false), []);
  return (
    <>
      <ModalSubscribe
        open={subscribe.show}
        feature={subscribe.feature}
        close={closeSubscribeModal}
      />
    </>
  );
}

export default ModalContainer;
