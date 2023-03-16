import {
  Box,
  Chip,
  Stack,
  StackProps,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import clsx from "clsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import useFetchRoute from "../../hooks/useFetchRoute";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeState from "../../recoil/route/atom";
import {
  addAvoidSystemSetter,
  deleteAvoidSystemSetter,
  jumpsSetter,
  routeSetter,
} from "../../recoil/route";
import { isConnectedSelector, isSubscribedSelector } from "../../recoil/user";
import OnlineIndicator from "../OnlineIndicator";
import RouteRendererItem from "./RouteRendererItem";
import { getTitleSequenceSelector } from "../../recoil/kills";

type RouteRendererProps = {
  position?: number;
  showProgress?: boolean;
  alwaysShowOrigin?: boolean;
  alwaysShowDestination?: boolean;
} & Omit<StackProps, "position">;

const StyledRouteRenderer = styled(Stack)(({}) => ({
  ".route-renderer__item:hover": {
    ".route__info-top-item": {
      opacity: 1,
    },
  },
  ".route-renderer__bar:hover": {
    ".route-renderer__bar__avoid-text": {
      display: "block",
    },
    ".route__solar-system": {
      cursor: "pointer",
    },
  },
  ".route-renderer__item.route-renderer__item--always-show-bottom-title:hover":
    {
      ".route__info-top-item": {
        opacity: 0,
      },
    },
  ".route-renderer__item:first-of-type .route__solar-system, .route-renderer__item:last-of-type .route__solar-system":
    {
      cursor: "default",
      ".route-renderer__bar__avoid-text": {
        display: "none",
      },
    },
  "&.route-renderer--always-show-destination": {
    ".route-renderer__item:nth-last-of-type(2) .route__info-top-item": {
      justifyContent: "flex-end",
    },
  },
  "&.route-renderer--always-show-origin": {
    ".route-renderer__item:nth-of-type(2) .route__info-top-item": {
      justifyContent: "flex-start",
    },
  },
}));

function RouteRenderer({
  position = 0,
  showProgress = false,
  alwaysShowDestination = false,
  alwaysShowOrigin = false,
  width = "100%",
  ...props
}: RouteRendererProps) {
  const theme = useTheme();
  const isConnected = useRecoilValue(isConnectedSelector);
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const setRouteState = useSetRecoilState(routeState);
  const setRouteRoute = routeSetter(setRouteState);

  const {
    origin,
    destination,
    avoidedSolarSystems,
    avoidEntryGateCamp,
    avoidGateCamp,
    avoidHics,
    avoidSmartBombs,
  } = useRecoilValue(routeState);

  const {
    data: route,
    isLoading,
    isValidating,
    hasError,
  } = useFetchRoute(
    origin,
    destination,
    avoidedSolarSystems.map(({ solarSystemID }) => solarSystemID),
    { avoidEntryGateCamp, avoidGateCamp, avoidHics, avoidSmartBombs }
  );
  const showTitle = useRecoilValue(getTitleSequenceSelector(route.route));

  const setJumps = (jumps: number) => jumpsSetter(setRouteState)(jumps);
  const onAvoidSolarSystem = (solarSystemID: number, name: string) => {
    if (solarSystemID === origin || solarSystemID === destination) {
      return;
    }
    addAvoidSystemSetter(setRouteState)({ solarSystemID, name });
  };
  const onUnavoidSolarSystem = (index: number) =>
    deleteAvoidSystemSetter(setRouteState)(index);

  useEffect(() => {
    if (route?.jumps) {
      setJumps(route.jumps);
      setRouteRoute(route.route.map(({ solarSystemID }) => solarSystemID));
    }
  }, [route]);

  return (
    <StyledRouteRenderer
      {...props}
      width={width}
      className={clsx({
        "route-renderer": true,
        "route-renderer--always-show-origin": alwaysShowDestination,
        "route-renderer--always-show-destination": alwaysShowDestination,
      })}
      minHeight={195}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {route.hasRoute ? (
        <>
          <Stack
            className="route-renderer__avoided-solar-systems"
            direction="column"
            spacing={2}
            width="100%"
            mb={2}
            justifyContent="center"
            minHeight={24}
          >
            <Stack
              alignItems="flex-start"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {avoidedSolarSystems.map(({ name }, index) => (
                <Chip
                  key={name}
                  clickable
                  variant="outlined"
                  size="small"
                  label={name}
                  onDelete={() => onUnavoidSolarSystem(index)}
                  onClick={() => onUnavoidSolarSystem(index)}
                  deleteIcon={<ClearIcon />}
                />
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} width="100%">
            <Stack mt={4}>
              <Stack
                direction="row"
                sx={{
                  opacity: route.jumps === 0 ? 0 : 1,
                  width: 23,
                  transition: route.jumps === 0 ? "" : "opacity 100ms",
                }}
              >
                <Typography>{showProgress ? position : route.jumps}</Typography>
                {showProgress && (
                  <>
                    <Typography>&nbsp;/&nbsp;</Typography>
                    <Typography>{route.jumps}</Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <TransitionGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "92%",
              }}
            >
              {route.route.map((node, index) => (
                <CSSTransition
                  classNames="route-renderer__item-wrapper"
                  key={node.solarSystemID}
                  timeout={300}
                >
                  <RouteRendererItem
                    node={node}
                    index={index}
                    count={route.route.length}
                    onAvoidSolarSystem={onAvoidSolarSystem}
                    alwaysShowTopTitle={
                      (index === 0 && alwaysShowOrigin) ||
                      (index === route.route.length - 1 &&
                        alwaysShowDestination) ||
                      (!showTitle[index] && route.route.length === 1)
                    }
                    alwaysShowBottomTitle={
                      !(
                        (index === 0 && alwaysShowOrigin) ||
                        (index === route.route.length - 1 &&
                          alwaysShowDestination)
                      ) && showTitle[index]
                    }
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
            <Box
              display={route.route.length > 0 ? "block" : "none"}
              className="route-renderer__indicator"
            >
              <OnlineIndicator
                ml={0.7}
                online={isConnected && isSubscribed}
                fontSize="small"
                mt={5.1}
              />
            </Box>
          </Stack>
        </>
      ) : (
        <Stack>
          <Typography>No gate-to-gate route</Typography>
        </Stack>
      )}
    </StyledRouteRenderer>
  );
}

export default RouteRenderer;
