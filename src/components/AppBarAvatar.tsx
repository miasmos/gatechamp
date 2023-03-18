import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { APP_API_DOMAIN } from "../constants";
import useLogout from "../hooks/useLogout";
import { isOnlineSelector } from "../recoil/status";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  characterSelector,
  isLoggedInSelector,
  isSubscribedSelector,
} from "../recoil/user";
import LogInIcon from "./icon/LogInIcon";
import Link from "./Link";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import OnlineIndicator from "./OnlineIndicator";
import Tooltip from "./Tooltip";

function AppBarAvatar() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const isCharacterOnline = useRecoilValue(isOnlineSelector);
  const loggedIn = useRecoilValue(isLoggedInSelector);
  const character = useRecoilValue(characterSelector);
  const { logout } = useLogout();

  return (
    <Stack className="app-bar__avatar" alignItems="center" direction="row">
      <Stack>
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
            <Stack direction="row">
              <Stack direction="row" spacing={2}>
                <OnlineIndicator online={isCharacterOnline} fontSize="small" />
                {!isSm && (
                  <Typography lineHeight={1.3} color="primary">
                    {character.name}
                  </Typography>
                )}
              </Stack>
              {isSubscribed && (
                <Stack ml={0.5} alignItems="center" direction="row">
                  <Tooltip title="Premium">
                    <RocketLaunchIcon
                      color="primary"
                      sx={{ fontSize: "1rem" }}
                    />
                  </Tooltip>
                </Stack>
              )}
              <Stack ml={3}>
                <Link
                  onClick={logout}
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Tooltip title="Logout">
                    <LogoutIcon fontSize="small" />
                  </Tooltip>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Link href={`${APP_API_DOMAIN}/v1/auth/login`}>
            <LogInIcon width={isSm ? 80 : 220} />
          </Link>
        )}
      </Stack>
    </Stack>
  );
}

export default AppBarAvatar;
