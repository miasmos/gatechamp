import { Button, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EVE_TRADE_PLUS_DOMAIN } from "../constants";
import useFetchLogout from "../hooks/useFetchLogout";
import { isOnlineSelector } from "../recoil/status";
import {
  characterSelector,
  isLoggedInSelector,
  loggedInSetter,
} from "../recoil/user";
import userState from "../recoil/user/atom";
import OnlineIndicator from "./OnlineIndicator";

function AppBarAvatar() {
  const [{ shouldLogout }, setState] = useState<{ shouldLogout: boolean }>({
    shouldLogout: false,
  });
  const isCharacterOnline = useRecoilValue(isOnlineSelector);
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const character = useRecoilValue(characterSelector);
  const setUserState = useSetRecoilState(userState);
  const onLogoutClick = () => {
    loggedInSetter(setUserState)();
    setState((state) => ({ ...state, shouldLogout: true }));
  };

  useFetchLogout(shouldLogout);

  useEffect(() => {
    if (shouldLogout) {
      setState((state) => ({ ...state, shouldLogout: false }));
    }
  }, [shouldLogout]);

  return (
    <Stack>
      {loggedIn ? (
        <Stack direction="row" alignItems="center" spacing={5}>
          <Stack direction="row" spacing={2}>
            <OnlineIndicator online={isCharacterOnline} fontSize="small" />
            <Typography lineHeight={1.3}>{character.name}</Typography>
          </Stack>
          <Link onClick={onLogoutClick}>
            <Button variant="outlined" size="small">
              Logout
            </Button>
          </Link>
        </Stack>
      ) : (
        <Link href={`${EVE_TRADE_PLUS_DOMAIN}/api/auth/login`}>
          <img src="/login.png" />
        </Link>
      )}
    </Stack>
  );
}

function AppBarAvatarLoading() {
  return <></>;
}

export default AppBarAvatar;
export { AppBarAvatarLoading };
