import { Stack, Typography } from "@mui/material";

function NotFound() {
  return (
    <Stack width="100%">
      <Typography variant="h4">
        Whatever you were looking for cannot be found.
      </Typography>
      <Typography variant="h5">Maybe in a wormhole somewhere?</Typography>
    </Stack>
  );
}

export default NotFound;
