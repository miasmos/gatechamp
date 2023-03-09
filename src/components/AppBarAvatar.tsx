import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { EVE_TRADE_PLUS_DOMAIN } from "../constants";
import useLogout from "../hooks/useLogout";
import { isOnlineSelector } from "../recoil/status";
import { characterSelector, isLoggedInSelector } from "../recoil/user";
import Link from "./Link";
import OnlineIndicator from "./OnlineIndicator";

function AppBarAvatar() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isCharacterOnline = useRecoilValue(isOnlineSelector);
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const character = useRecoilValue(characterSelector);
  const { logout } = useLogout();

  return (
    <Stack className="app-bar__avatar">
      {loggedIn ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={5}
          sx={{
            [theme.breakpoints.down("sm")]: {
              "> *": { mr: 0, ml: `${theme.spacing(2)}!important` },
            },
          }}
        >
          <Stack direction="row" spacing={2}>
            <OnlineIndicator online={isCharacterOnline} fontSize="small" />
            {!isSm && (
              <Typography lineHeight={1.3}>{character.name}</Typography>
            )}
          </Stack>

          <Link onClick={logout}>
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
