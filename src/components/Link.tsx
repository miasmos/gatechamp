import { LinkProps, Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

function Link(props: LinkProps) {
  if (props.href?.startsWith("#")) {
    return <MuiLink fontWeight="bold" {...props} />;
  }
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? "#"} />
  );
}

export default Link;
