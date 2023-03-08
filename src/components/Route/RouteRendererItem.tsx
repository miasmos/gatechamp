import { Stack, styled } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBar from "./RouteRendererBar";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";

type RouteRendererItemProps = {
  count: number;
  index: number;
  node: RouteJumpSummary;
  alwaysShowDestination?: boolean;
  alwaysShowOrigin?: boolean;
  onAvoidSolarSystem: (solarSystemID: number, name: string) => void;
};

function RouteRendererItem({
  count,
  index,
  node,
  alwaysShowDestination = false,
  alwaysShowOrigin = false,
  onAvoidSolarSystem,
}: RouteRendererItemProps) {
  return (
    <Stack
      className="route-renderer__item"
      sx={{
        width: `${100 / count}%`,
        height: "15px",
        position: "relative",
        "&.route-renderer__item-wrapper-enter": {
          width: 0,
          ".route__bottom-info": {
            opacity: 0,
          },
        },
        "&.route-renderer__item-wrapper-enter-active": {
          width: `${100 / count}%`,
          transition: "width 300ms ",
          transitionDelay: "150ms",
          ".route__bottom-info": {
            transition: "opacity 300ms",
            transitionDelay: "150ms",
            opacity: 1,
          },
        },
        "&.route-renderer__item-wrapper-exit": {
          width: 0,
          ".route__bottom-info": {
            opacity: 1,
          },
        },
        "&.route-renderer__item-wrapper-exit-active": {
          width: 0,
          ".route__bottom-info": {
            opacity: 0,
          },
        },
      }}
    >
      <RouteRendererTopInfo
        node={node}
        alwaysShowDestination={alwaysShowDestination}
        alwaysShowOrigin={alwaysShowOrigin}
        index={index}
        count={count}
      />
      <RouteRendererBar
        node={node}
        onAvoid={onAvoidSolarSystem}
        index={index}
        count={count}
      />
      <RouteRendererBottomInfo
        node={node}
        alwaysShowDestination={alwaysShowDestination}
        alwaysShowOrigin={alwaysShowOrigin}
        index={index}
        count={count}
      />
    </Stack>
  );
}

export default RouteRendererItem;
