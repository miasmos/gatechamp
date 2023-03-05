import { AppBar as MuiAppBar, Link, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { EVE_TRADE_PLUS_DOMAIN } from "../constants";
import { AppRoute } from "../enum";
import { isLoggedInSelector } from "../recoil/user";

function AppBar() {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  return (
    <MuiAppBar color="transparent" elevation={0} sx={{ height: 90 }}>
      <Stack
        height="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        px={10}
      >
        <Stack justifyContent="center" height="100%">
          <Link href={AppRoute.Home}>
            <Typography variant="h5" fontWeight="normal">
              EveTrade+
            </Typography>
          </Link>
        </Stack>
        <Stack justifyContent="center" height="100%">
          {isLoggedIn ? (
            <>:)</>
          ) : (
            <Link href={`${EVE_TRADE_PLUS_DOMAIN}/api/auth/login`}>
              <img src="/login.png" />
            </Link>
          )}
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

export default AppBar;
