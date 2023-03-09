import { Stack } from "@mui/material";
import { Outlet } from "react-router";

function TripLayout() {
  return (
    <Stack
      className="layout__trip"
      width="100%"
      alignSelf="center"
      justifyContent="center"
      minHeight="69vh"
      direction="row"
    >
      <Outlet />
    </Stack>
  );
}

export default TripLayout;
