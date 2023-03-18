import {
  AppBar as MuiAppBar,
  Button,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { AppRoute } from "../enum";
import { isSubscribedSelector } from "../recoil/user";
import AppBarAvatar from "./AppBarAvatar";
import LogoIcon from "./icon/LogoIcon";

function AppBar() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSubscribed = useRecoilValue(isSubscribedSelector);

  return (
    <MuiAppBar
      className="app-bar"
      elevation={0}
      sx={{
        height: 90,
        width: "100vw",
        left: 0,
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Stack
        height="100%"
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        px={10}
        sx={{
          [theme.breakpoints.down("sm")]: {
            px: 3,
          },
        }}
      >
        <Stack justifyContent="center" height="100%">
          <Link href={AppRoute.Home}>
            <LogoIcon color={theme.palette.primary.main} width={160} mt={1} />
          </Link>
        </Stack>
        <Stack justifyContent="center" height="100%">
          <Stack direction="row" spacing={5}>
            {!isSubscribed && !isSm && (
              <Link
                href={AppRoute.Premium}
                sx={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button variant="outlined" size="small">
                  Get Premium
                </Button>
              </Link>
            )}
            <AppBarAvatar />
          </Stack>
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

export default AppBar;
