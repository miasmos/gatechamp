import { SetterOrUpdater } from "recoil";
import { NotificationState } from "../atom";

const notificationSetter =
  (setter: SetterOrUpdater<NotificationState>) =>
  (nextState: Partial<NotificationState>) =>
    setter((state) => ({
      ...state,
      ...nextState,
    }));

export default notificationSetter;
