import { Stack } from "@mui/material";
import { Outlet } from "react-router";

function StationFlowLayout() {
  return (
    <Stack className="layout__station-flow" alignSelf="center">
      <Outlet />
    </Stack>
  );
}

export default StationFlowLayout;
