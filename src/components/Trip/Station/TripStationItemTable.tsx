import { useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "../../../util/currency";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { stringifyItemOrder, stringifyItemsOrder } from "../../../util/eve";
import { CargoBayItem } from "../../../hooks/useFetchTripStation";
import ProgressBar from "../../ProgressBar";
import { palette } from "../../../theme";

type TripStationItemTableProps = CargoBayItem & {
  title: string;
  maxVolume: number;
  maxCost: number;
  onIgnore: (itemId: number) => void;
};

function TripStationItemTable({
  items,
  volume,
  profit,
  title,
  maxVolume,
  maxCost,
  cost,
  onIgnore,
}: TripStationItemTableProps) {
  const stringifiedBuyOrder = useMemo(
    () => stringifyItemsOrder(items),
    [items]
  );

  const table =
    items.length === 0 ? (
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center">
          <Typography textAlign="center">No Results</Typography>
        </Stack>
      </Stack>
    ) : (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow
                  sx={{
                    ".MuiTableCell-root": {
                      background: palette.palette.background.paper,
                    },
                  }}
                >
                  <TableCell />
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Buy</TableCell>
                  <TableCell align="right">Sell</TableCell>
                  <TableCell align="right">Profit</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">Efficiency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(
                  ({
                    item,
                    itemId,
                    efficiency,
                    quantity,
                    netProfit,
                    buyPrice,
                    sellPrice,
                    volume,
                    packagedVolume,
                  }) => (
                    <TableRow
                      key={item}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell scope="row" sx={{ pl: 1, pr: 0 }}>
                        <Stack direction="row" spacing={0.5}>
                          {/* <CloseIcon
                            fontSize="small"
                            color="primary"
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => onIgnore(itemId)}
                          /> */}
                          <CopyToClipboard
                            text={stringifyItemOrder({
                              item,
                              quantity,
                              buyPrice,
                            })}
                          >
                            <ContentCopyIcon
                              fontSize="small"
                              color="primary"
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  transform: "translate(-1px,-1px);",
                                },
                                "&:active": {
                                  transform: "translate(1px,1px);",
                                },
                              }}
                            />
                          </CopyToClipboard>
                        </Stack>
                      </TableCell>
                      <TableCell scope="row">{item}</TableCell>
                      <TableCell align="right">
                        {quantity} @ Ƶ{formatCurrency(buyPrice)}
                      </TableCell>
                      <TableCell align="right">
                        {quantity} @ Ƶ{formatCurrency(sellPrice)}
                      </TableCell>
                      <TableCell align="right">
                        Ƶ{formatCurrency(netProfit)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(packagedVolume || volume)} m³
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(efficiency)}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Stack direction="row" mt={2} mx={1} justifyContent="space-between">
          <Typography>
            {items.length} item{items.length === 1 ? "" : "s"}
          </Typography>
          <ButtonGroup>
            <CopyToClipboard text={stringifiedBuyOrder}>
              <Button size="small" endIcon={<ContentCopyIcon />}>
                Copy All
              </Button>
            </CopyToClipboard>
          </ButtonGroup>
        </Stack>
      </>
    );

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" mb={1.5}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h4" lineHeight={0.9}>
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ProgressBar width={40} height={10} progress={cost / maxCost} />
              <Stack direction="row">
                <Typography variant="body2" mt={0.3}>
                  Ƶ
                </Typography>
                <Typography>{formatCurrency(cost)}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ProgressBar
                width={40}
                height={10}
                progress={volume / maxVolume}
              />
              <Stack direction="row">
                <Typography>{formatCurrency(volume)}</Typography>
                <Typography variant="body2" mt={0.3}>
                  &nbsp;m³
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Typography variant="body2" mt={0.3}>
            Ƶ
          </Typography>
          <Typography>{formatCurrency(profit)}</Typography>
          <Typography variant="body2" mt={0.4}>
            &nbsp;profit
          </Typography>
        </Stack>
      </Stack>
      {table}
    </Stack>
  );
}

export default TripStationItemTable;
