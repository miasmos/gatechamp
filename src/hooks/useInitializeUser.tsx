import { useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { parseISO, addMinutes, isAfter } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import Cookies from "js-cookie";
import { useInterval } from "usehooks-ts";
import userState from "../recoil/user/atom";
import { getWithResponse } from "../api";
import { userSetter } from "../recoil/user";

let didInitializeUser = false;

function useInitializeUser() {
  const [{ loggedIn }, setUserState] = useRecoilState(userState);
  const setUser = userSetter(setUserState);

  const attemptLogIn = async (isLoggedIn = false) => {
    const activeCharacterId = Cookies.get("active_character_id");
    const authToken = Cookies.get("access_token");
    const expiresAt = Cookies.get("access_token_expires_at");
    const refreshTokenExists = Cookies.get("refresh_token_exists");

    const expiryDate = parseISO(expiresAt!);
    const hasExpiry = (expiryDate as unknown as string) !== "Invalid Date";
    const doesAuthTokenExist =
      Boolean(authToken) && Boolean(expiresAt) && hasExpiry;

    if (doesAuthTokenExist) {
      console.log("auth token exists");
      const now = zonedTimeToUtc(
        Date.now(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      const willExpireSoon = isAfter(addMinutes(now, 1), expiryDate);
      if (!willExpireSoon) {
        // logged in
        isLoggedIn = true;
      }
    }

    if (!isLoggedIn) {
      console.log("auth token does not exist");
      // not logged in, attempt refresh
      if (refreshTokenExists) {
        console.log("attempting refresh");

        try {
          await getWithResponse("/api/auth/refresh", {
            "x-character-id": activeCharacterId,
          });
          console.log("logged in");
          // logged in
          isLoggedIn = true;
        } catch {}
      }
    }

    if (isLoggedIn) {
      console.log("logged in");
      setUser({
        loggedIn: true,
        activeCharacter: Number(activeCharacterId),
        loginExpiresAt: expiryDate.toISOString(),
      });
    } else {
      console.log("not logged in");
      setUser({
        loggedIn: false,
        activeCharacter: -1,
        loginExpiresAt: undefined,
      });
    }
  };

  useInterval(attemptLogIn, loggedIn ? 1 * 60 * 1000 : null); // 1m
  useLayoutEffect(() => {
    if (didInitializeUser) {
      return;
    }
    didInitializeUser = true;

    attemptLogIn();
  }, []);
}

export default useInitializeUser;