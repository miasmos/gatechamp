import { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { formatCurrency } from "../util/currency";
import {
  RouteSecurity,
  Station as StationEnum,
  SystemSecurity,
  Tax,
} from "../enum";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useRecoilState } from "recoil";
import stationFormState from "../recoil/stationForm/atom";

interface StationFormState {
  from: StationEnum;
  to: boolean[];
  maxBudget: number;
  maxWeight: number;
  maxWeight2: number;
  minProfit: number;
  minRoi: number;
  routeSafety: RouteSecurity;
  security: boolean[];
  tax: number;
}

interface StationFormProps {
  onSubmit: (state: StationFormState) => void;
}

function StationForm({ onSubmit }: StationFormProps) {
  const [
    {
      from,
      to,
      maxBudget,
      maxWeight,
      maxWeight2,
      minProfit,
      minRoi,
      routeSafety,
      security,
      tax,
    },
    setState,
  ] = useRecoilState(stationFormState);
  const validateForm = () => !Number.isNaN(maxWeight) && hasStation(to);
  const onMaxBudgetChange = (_: any, value: number | number[]) =>
    setState((state: StationFormState) => ({
      ...state,
      maxBudget: value as number,
    }));
  const onMaxWeightChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((state: StationFormState) => ({
      ...state,
      maxWeight: Number(event.target.value),
    }));
  const onMaxWeight2Change = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((state: StationFormState) => ({
      ...state,
      maxWeight2: Number(event.target.value),
    }));
  const onMinProfitChange = (_: any, value: number | number[]) =>
    setState((state: StationFormState) => ({
      ...state,
      minProfit: value as number,
    }));
  const onMinRoiChange = (_: any, value: number | number[]) =>
    setState((state: StationFormState) => ({
      ...state,
      minRoi: value as number,
    }));
  const onSafetyChange = (event: SelectChangeEvent<RouteSecurity>) =>
    setState((state: StationFormState) => ({
      ...state,
      routeSafety: event.target.value as RouteSecurity,
    }));
  const onTaxChange = (event: SelectChangeEvent<number>) =>
    setState((state: StationFormState) => ({
      ...state,
      tax: Number(event.target.value),
    }));
  const onIgnoreSecurity = (currentValue: SystemSecurity, value: boolean) => {
    const nextArr = security.slice();
    const index = Object.values(SystemSecurity).findIndex(
      (value) => value === currentValue
    );
    nextArr[index] = value;
    setState((state: StationFormState) => ({ ...state, security: nextArr }));
  };
  const onFromChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState((state: StationFormState) => ({
      ...state,
      from: event.target.value as StationEnum,
    }));
  const onToChange = (currentValue: StationEnum, value: boolean) => {
    const nextArr = to.slice();
    const index = Object.values(StationEnum).findIndex(
      (value) => value === currentValue
    );
    nextArr[index] = value;
    setState((state: StationFormState) => ({ ...state, to: nextArr }));
  };
  const hasStation = (values: boolean[]) =>
    values.filter((value) => Boolean(value)).length > 0;
  const onSearchClick = () => {
    if (!validateForm()) {
      return;
    }
    onSubmit({
      from,
      to,
      maxBudget,
      maxWeight,
      maxWeight2,
      minProfit,
      minRoi,
      routeSafety,
      security,
      tax,
    });
  };

  return (
    <>
      <Typography variant="h4" mb={5}>
        Station to Station
      </Typography>
      <Stack direction="column" spacing={2}>
        {/* From */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              From
            </Typography>
          </Stack>
          <RadioGroup
            sx={{ ml: "0 !important" }}
            row
            value={from}
            onChange={onFromChange}
          >
            {Object.entries(StationEnum)
              .filter(([key]) => key !== "None")
              .map(([key, value]) => (
                <FormControlLabel
                  key={value}
                  sx={{ ml: 6.5 }}
                  labelPlacement="start"
                  value={value}
                  control={<Radio />}
                  label={key}
                />
              ))}
          </RadioGroup>
        </Stack>

        {/* To */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              To
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4}>
            {Object.entries(StationEnum)
              .filter(([key]) => key !== "None")
              .map(([key, value], index) => (
                <Stack key={value} direction="row" alignItems="center">
                  <Typography sx={{ width: 50 }} textAlign="right">
                    {key}
                  </Typography>
                  <Checkbox
                    checked={to[index]}
                    onChange={(event) =>
                      onToChange(value, event.target.checked)
                    }
                  />
                </Stack>
              ))}
          </Stack>
        </Stack>

        {/* Budget */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              Budget
            </Typography>
          </Stack>
          <Slider
            value={maxBudget}
            onChange={onMaxBudgetChange}
            min={1}
            max={2000}
            step={1}
          />
          <Typography sx={{ width: 20 }}>
            {formatCurrency(maxBudget * 1000000)}
          </Typography>
        </Stack>

        {/* Cargo */}
        <Stack direction="row" spacing={4}>
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} textAlign="right">
                Cargo Hold 1
              </Typography>
            </Stack>
            <TextField
              required
              fullWidth
              defaultValue={maxWeight}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m³</InputAdornment>
                ),
              }}
              onChange={onMaxWeightChange}
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} textAlign="right">
                Cargo Hold 2
              </Typography>
            </Stack>
            <TextField
              required
              fullWidth
              defaultValue={maxWeight2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m³</InputAdornment>
                ),
              }}
              onChange={onMaxWeight2Change}
            />
          </Stack>
        </Stack>

        {/* Min Profit */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              Min Profit
            </Typography>
          </Stack>
          <Slider
            value={minProfit}
            onChange={onMinProfitChange}
            min={0.01}
            max={1}
            step={0.01}
          />
          <Typography sx={{ width: 20 }}>
            {formatCurrency(minProfit * 1000000)}
          </Typography>
        </Stack>

        {/* Min Roi */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              Min Roi
            </Typography>
          </Stack>
          <Slider
            value={minRoi}
            onChange={onMinRoiChange}
            min={0.01}
            max={1}
            step={0.01}
          />
          <Typography sx={{ width: 20 }}>{`${Math.floor(
            minRoi * 100
          )}%`}</Typography>
        </Stack>

        <Stack direction="row">
          {/* Route Safety */}
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} textAlign="right">
                Safety
              </Typography>
            </Stack>
            <Select value={routeSafety} onChange={onSafetyChange}>
              {Object.entries(RouteSecurity).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Tax */}
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ width: 100 }} textAlign="right">
                Tax
              </Typography>
            </Stack>
            <Select value={tax} onChange={onTaxChange}>
              {Object.entries(Tax).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>

        {/* Security */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              Ignore
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4}>
            {Object.entries(SystemSecurity).map(([key, value], index) => (
              <Stack
                key={value}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Typography sx={{ width: 50 }}>{key}</Typography>
                <Checkbox
                  checked={security[index]}
                  onChange={(event) =>
                    onIgnoreSecurity(value, event.target.checked)
                  }
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={5}>
        <Button
          sx={{ height: 60 }}
          variant="contained"
          disabled={!validateForm()}
          onClick={onSearchClick}
        >
          Route
        </Button>
      </Stack>
    </>
  );
}

export default StationForm;
export type { StationFormState };
