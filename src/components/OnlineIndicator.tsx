import { Stack, StackProps, Tooltip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

type OnlineIndicatorProps = {
  online: boolean;
} & StackProps;

function OnlineIndicator({ online, ...props }: OnlineIndicatorProps) {
  return (
    <Stack direction="row" alignItems="center" {...props} width={10}>
      {!online ? (
        <Tooltip title="Offline">
          <Stack
            sx={{ width: 5, height: 5 }}
            alignItems="center"
            justifyContent="center"
          >
            <CircleOutlinedIcon sx={{ opacity: 0.4 }} fontSize="inherit" />
          </Stack>
        </Tooltip>
      ) : (
        <Tooltip title="Online">
          <Stack
            sx={{
              boxShadow: "0 0 1px 1px #fffffffa",
              width: 5,
              height: 5,
              "@keyframes pulse": {
                from: {
                  boxShadow: `0 0 0 0 rgba(255,255,255, 0.3)`,
                },
                to: {
                  boxShadow: `0 0 0 9px rgba(255,255,255, 0)`,
                },
              },
              borderRadius: "50%",
              animation: "pulse 3s infinite",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <CircleIcon fontSize="inherit" htmlColor="#53e45a" />
          </Stack>
        </Tooltip>
      )}
    </Stack>
  );
}

export default OnlineIndicator;
