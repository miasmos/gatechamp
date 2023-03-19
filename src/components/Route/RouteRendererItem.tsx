import { Stack } from "@mui/material";
import clsx from "clsx";
import { RouteJumpSummary } from "../../hooks/useFetchRoute";
import RouteRendererBar from "./RouteRendererBar";
import RouteRendererBottomInfo from "./RouteRendererBottomInfo";
import RouteRendererTopInfo from "./RouteRendererTopInfo";

type RouteRendererItemProps = {
  count: number;
  index: number;
  node: RouteJumpSummary;
  alwaysShowTopTitle?: boolean;
  alwaysShowBottomTitle?: boolean;
  canAvoid?: boolean;
  onAvoidSolarSystem: (solarSystemID: number, name: string) => void;
};

function RouteRendererItem({
  count,
  index,
  node,
  alwaysShowTopTitle = false,
  alwaysShowBottomTitle = false,
  canAvoid = true,
  onAvoidSolarSystem,
}: RouteRendererItemProps) {
  return (
    <Stack
      className={clsx({
        "route-renderer__item": true,
        "route-renderer__item--always-show-top-title": alwaysShowTopTitle,
        "route-renderer__item--always-show-bottom-title": alwaysShowBottomTitle,
      })}
      sx={{
        width: `${100 / count}%`,
        position: "relative",
        "&.route-renderer__item-wrapper-enter": {
          width: 0,
          ".route__bottom-info, .route__top-info, .gate-camp": {
            opacity: 0,
          },
        },
        "&.route-renderer__item-wrapper-enter-active": {
          width: `${100 / count}%`,
          transition: "width 300ms ",
          transitionDelay: "80ms",
          ".route__bottom-info, .route__top-info, .gate-camp": {
            transition: "opacity 300ms",
            transitionDelay: "200ms",
            opacity: 1,
          },
        },
        "&.route-renderer__item-wrapper-exit": {
          width: 0,
          ".route__bottom-info, .route__top-info, .gate-camp": {
            opacity: 1,
          },
        },
        "&.route-renderer__item-wrapper-exit-active": {
          width: 0,
          ".route__bottom-info, .route__top-info, .gate-camp": {
            opacity: 0,
          },
        },
      }}
    >
      <RouteRendererTopInfo node={node} alwaysShowTitle={alwaysShowTopTitle} />
      <RouteRendererBar
        node={node}
        onAvoid={onAvoidSolarSystem}
        index={index}
        count={count}
        canAvoid={canAvoid}
      />
      <RouteRendererBottomInfo
        node={node}
        count={count}
        alwaysShowTitle={alwaysShowBottomTitle}
      />
    </Stack>
  );
}

export default RouteRendererItem;
