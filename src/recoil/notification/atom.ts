import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface NotificationState {
  hasPermission: boolean;
  doesBrowserSupport: boolean;
}

const notificationState = atom<NotificationState>({
  key: "NotificationState",
  default: {
    hasPermission: false,
    doesBrowserSupport: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export default notificationState;
export type { NotificationState };
