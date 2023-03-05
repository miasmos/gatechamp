import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { parseISO, addMinutes, isBefore } from "date-fns";
import Cookies from "js-cookie";
import userState from "../recoil/user/atom";
import { getWithResponse } from "../api";
import { userSetter } from "../recoil/user";

let didInitializeUser = false;

function useInitializeUser() {
  const setUserState = useSetRecoilState(userState);
  const setUser = userSetter(setUserState);

  useEffect(() => {
    if (didInitializeUser) {
      return;
    }
    didInitializeUser = true;

    (async () => {
      const activeCharacterId = Cookies.get("active_character_id");
      const authToken = Cookies.get("access_token");
      const expiresAt = Cookies.get("access_token_expires_at");
      const refreshTokenExists = Cookies.get("refresh_token_exists");
      const expiryDate = parseISO(expiresAt!);
      const hasExpiry = (expiryDate as unknown as string) !== "Invalid Date";
      const doesAuthTokenExist =
        Boolean(authToken) && Boolean(expiresAt) && hasExpiry;
      let isLoggedIn = false;

      if (doesAuthTokenExist) {
        const isExpiryBeforeNow = isBefore(
          addMinutes(new Date(), 1),
          expiryDate
        );
        if (isExpiryBeforeNow) {
          // logged in
          isLoggedIn = true;
        }
      }

      if (!isLoggedIn) {
        // not logged in, attempt refresh
        if (refreshTokenExists) {
          try {
            await getWithResponse("/api/auth/refresh", {
              "x-character-id": activeCharacterId,
            });

            // logged in
            isLoggedIn = true;
          } catch {}
        }
      }

      if (isLoggedIn) {
        setUser({
          loggedIn: true,
          activeCharacter: Number(activeCharacterId),
          loginExpiresAt: expiryDate,
        });
      } else {
        setUser({
          loggedIn: false,
          activeCharacter: -1,
          loginExpiresAt: undefined,
        });
      }
    })();
  }, []);
}

export default useInitializeUser;
