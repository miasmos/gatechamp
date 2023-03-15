import { useEffect } from "react";
import { useRecoilState } from "recoil";
import notificationState from "../recoil/notification/atom";
import notificationSetter from "../recoil/notification/setters/notificationSetter";

function useNotification() {
  const [{ hasPermission }, setNotificationState] =
    useRecoilState(notificationState);
  const setState = notificationSetter(setNotificationState);

  useEffect(() => {
    (async () => {
      //   if (hasPermission) {
      //     return;
      //   }

      const doesBrowserSupport = "Notification" in window;
      let nextHasPermission = false;

      if (doesBrowserSupport) {
        const permission: NotificationPermission =
          await Notification.requestPermission();
        nextHasPermission = permission === "granted";
      }
      setState({ hasPermission: nextHasPermission, doesBrowserSupport });

      new Notification("Ahbazon", {
        body: "New gate camp in your path",
        icon: "/favicon.png",
      });
    })();
  }, []);
}

export default useNotification;
