import { atom } from "recoil";

enum ModalSubscribeFeature {
  None,
  LocationTracking,
  RouteCharting,
  Notifications,
  RealtimeMonitoring,
}

interface ModalState {
  subscribe: {
    show: boolean;
    feature: ModalSubscribeFeature;
  };
}

const modalState = atom<ModalState>({
  key: "ModalState",
  default: {
    subscribe: {
      show: false,
      feature: ModalSubscribeFeature.None,
    },
  },
});

export default modalState;
export type { ModalState };
export { ModalSubscribeFeature };
