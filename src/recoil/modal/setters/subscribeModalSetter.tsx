import { SetterOrUpdater } from "recoil";
import { ModalState, ModalSubscribeFeature } from "../atom";

const subscribeModalSetter =
  (setter: SetterOrUpdater<ModalState>) =>
  (
    show: boolean,
    feature: ModalSubscribeFeature = ModalSubscribeFeature.None
  ) =>
    setter((state) => ({
      ...state,
      subscribe: {
        show,
        feature,
      },
    }));

export default subscribeModalSetter;
