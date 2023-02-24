import { useState } from "react";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import useFetchStation, {
  ParsedFetchStationItem,
} from "../hooks/useFetchStation";
import { getStationDisplayName } from "../util/eveTrade";
import { StationFormState } from "./StationForm";
import StationItemTable from "./StationItemTable";
import { computeItemEfficiency } from "../util/item";
import { CargoHold } from "../enum";

interface StationResultProps {
  form: StationFormState;
  onReset: () => void;
}

function StationResult({ form, onReset }: StationResultProps) {
  const { items, isLoading, hasError } = useFetchStation(form);
  const [
    {
      cargoHold1: { ignore: cargoHold1Ignore },
      cargoHold2: { ignore: cargoHold2Ignore },
    },
    setState,
  ] = useState<{
    cargoHold1: { ignore: number[] };
    cargoHold2: { ignore: number[] };
  }>({ cargoHold1: { ignore: [] }, cargoHold2: { ignore: [] } });

  const result = useMemo(
    () =>
      computeItemEfficiency(items, form, cargoHold1Ignore, cargoHold2Ignore),
    [items, form, cargoHold1Ignore, cargoHold2Ignore]
  );

  const ignoreCargoHoldItem = (cargoHold: CargoHold) => (itemId: number) => {
    if (cargoHold === CargoHold.One) {
      setState((state) => ({
        ...state,
        cargoHold1: { ignore: [...cargoHold1Ignore, itemId] },
      }));
    } else {
      setState((state) => ({
        ...state,
        cargoHold2: { ignore: [...cargoHold2Ignore, itemId] },
      }));
    }
  };

  if (hasError) {
    console.log("error while fetching", hasError);
  }
  if (!result) {
    return <>Loading...</>;
  }

  const { destination, origin, cargoHold1, cargoHold2 } = result;
  return (
    <Stack spacing={5}>
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="h4" mb={1}>
              {getStationDisplayName(origin)}
            </Typography>
          </Stack>
          <ArrowRightAltIcon />
          <Stack alignItems="center">
            <Typography variant="h4" mb={1}>
              {getStationDisplayName(destination)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={5}>
        <StationItemTable
          title="Cargo Hold 1"
          maxVolume={form.maxWeight}
          maxCost={form.maxBudget * 1000000}
          onIgnore={ignoreCargoHoldItem(CargoHold.One)}
          {...cargoHold1}
        />
        <StationItemTable
          title="Cargo Hold 2"
          maxVolume={form.maxWeight2}
          maxCost={form.maxBudget * 1000000 - cargoHold1.cost}
          onIgnore={ignoreCargoHoldItem(CargoHold.One)}
          {...cargoHold2}
        />
      </Stack>
      <Button sx={{ height: 60 }} variant="contained" onClick={onReset}>
        Reset
      </Button>
    </Stack>
  );
}

export default StationResult;
