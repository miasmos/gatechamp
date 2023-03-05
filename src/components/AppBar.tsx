import { Suspense } from "react";
import { AppBar as MuiAppBar, Link, Stack, Typography } from "@mui/material";
import { AppRoute } from "../enum";
import AppBarAvatar, { AppBarAvatarLoading } from "./AppBarAvatar";

function AppBar() {
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
          <Suspense fallback={<AppBarAvatarLoading />}>
            <AppBarAvatar />
          </Suspense>
        </Stack>
      </Stack>
    </MuiAppBar>
  );
}

export default AppBar;
