import { Box, Stack } from "@mui/material";
import { FetchRouteResult } from "../hooks/useFetchRoute";
import { to2dArray } from "../util/array";
import { getSecurityColor } from "../util/eveTrade";

type RouteRendererProps = {
  route: FetchRouteResult;
};

function RouteRenderer({ route }: RouteRendererProps) {
  const columns = 8;
  return (
    <Stack>
      {to2dArray(route.route, columns).map((row, index) => (
        <Stack direction="row" key={`r1${index}`}>
          {row.map(({ name, security }, index) => (
            <Stack
              direction="row"
              width={`${100 / columns}%`}
              height={12}
              key={`r2${name}${index}`}
              sx={{
                ":not(:last-child) > .route__system": {
                  borderRight: "1px solid black",
                },
              }}
            >
              {name ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  className="route__system"
                  height="100%"
                  width="100%"
                >
                  <Box
                    height="50%"
                    width="100%"
                    sx={{
                      background: getSecurityColor(security),
                    }}
                  />
                </Stack>
              ) : (
                <Stack className="route__system--empty" />
              )}
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default RouteRenderer;
