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
import { formatCurrency } from "../util/currency";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { EfficientItemsResult } from "./StationResult";
import { stringifyItemsOrder } from "../util/eveTrade";

type StationItemTableProps = EfficientItemsResult & {
  title: string;
  maxVolume: number;
  maxCost: number;
};

function StationItemTable({
  items,
  volume,
  profit,
  title,
  maxVolume,
  maxCost,
  cost,
}: StationItemTableProps) {
  const stringifiedBuyOrder = useMemo(
    () => stringifyItemsOrder(items, "buy"),
    [items]
  );
  const stringifiedSellOrder = useMemo(
    () => stringifyItemsOrder(items, "sell"),
    [items]
  );
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={0.5}>
          <Typography variant="h4">{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>
              {formatCurrency(volume)} / {formatCurrency(maxVolume)} m³
            </Typography>
            <Typography>
              Ƶ{formatCurrency(cost)} / {formatCurrency(maxCost)}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          Ƶ{formatCurrency(profit)} profit
        </Stack>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
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
                  efficiency,
                  quantity,
                  netProfit,
                  buyPrice,
                  sellPrice,
                  volume,
                }) => (
                  <TableRow
                    key={item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item}
                    </TableCell>
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
                      {formatCurrency(volume)} m³
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
      <Stack mt={2} alignItems="flex-end">
        <ButtonGroup>
          <CopyToClipboard text={stringifiedBuyOrder}>
            <Button size="small" endIcon={<ContentCopyIcon />}>
              Buy
            </Button>
          </CopyToClipboard>
          <CopyToClipboard text={stringifiedSellOrder}>
            <Button size="small" endIcon={<ContentCopyIcon />}>
              Sell
            </Button>
          </CopyToClipboard>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

export default StationItemTable;
