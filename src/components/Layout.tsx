import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router";
import { AppRoute } from "../enum";
import Link from "./Link";

function Layout() {
  return (
    <Box className="App">
      <Link href={AppRoute.Home}>
        <Typography variant="h2">EveTrade+</Typography>
      </Link>
      <Outlet />
    </Box>
  );
}

export default Layout;
