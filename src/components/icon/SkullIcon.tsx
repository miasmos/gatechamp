/// <reference types="vite-plugin-svgr/client" />
import { Stack, StackProps } from "@mui/material";
import { forwardRef } from "react";
import { ReactComponent } from "../../../public/skull.svg";

const SkullIcon = forwardRef((props: StackProps, ref) => {
  return (
    <Stack {...props} ref={ref}>
      <ReactComponent width={15} />
    </Stack>
  );
});

export default SkullIcon;
