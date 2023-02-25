import { Box } from "@mui/system";
import { Outlet } from "react-router";

function StationFlowLayout() {
  return (
    <Box className="Station-Flow">
      <Outlet />
    </Box>
  );
}

export default StationFlowLayout;
