import { Box } from "@mui/system";
import { Outlet } from "react-router";

function TripLayout() {
  return (
    <Box className="Trip">
      <Outlet />
    </Box>
  );
}

export default TripLayout;
