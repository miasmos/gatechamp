import { AppBar as MuiAppBar, Link, Stack, useTheme } from "@mui/material";
import { AppRoute } from "../enum";
import AppBarAvatar from "./AppBarAvatar";
import LogoIcon from "./icon/LogoIcon";

function AppBar() {
  const theme = useTheme();
  return (
    <MuiAppBar
      className="app-bar"
      elevation={0}
      sx={{
        height: 90,
        width: "100vw",
        left: 0,
        background: (theme) => theme.palette.background.default,
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
          <AppBarAvatar />
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

export default AppBar;
