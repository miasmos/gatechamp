import { Button, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EVE_TRADE_PLUS_DOMAIN } from "../constants";
import useFetchLogout from "../hooks/useFetchLogout";
import { characterSelector, loggedInSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

function AppBarAvatar() {
  const [{ shouldLogout }, setState] = useState<{ shouldLogout: boolean }>({
    shouldLogout: false,
  });
  const { loggedIn, activeCharacter } = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState);
  const character = useRecoilValue(
    characterSelector({ loggedIn, characterId: activeCharacter })
  );
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
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography>{character.name}</Typography>
          <Link onClick={onLogoutClick}>
            <Button variant="contained" size="small">
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
