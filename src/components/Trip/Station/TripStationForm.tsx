import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { formatCurrency } from "../../../util/currency";
import { Station as StationEnum, Tax } from "../../../enum";
import tripState, {
  clearOtherCargoSetter,
  fromSetter,
  generateIdSetter,
  hasStationSelector,
  maxBudgetSetter,
  minProfitSetter,
  minRoiSetter,
  otherCargoSetter,
  taxSetter,
  toSetter,
} from "../../../recoil/trip";
import { NavigationIntention } from "../../../types";
import MainButton from "../../MainButton";
import { TextField } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import Checkbox from "../../Checkbox";
import { getPersonalWalletBalance } from "../../../recoil/status";
import { isConnectedSelector } from "../../../recoil/user";

type TripStationProps = NavigationIntention;

function TripStationForm({ to: navigateTo }: TripStationProps) {
  const navigate = useNavigate();
  const isConnected = useRecoilValue(isConnectedSelector);
  const balance = useRecoilValue(getPersonalWalletBalance);
  const [
    { from, to, maxBudget, minProfit, minRoi, tax, otherCargo },
    setTripState,
  ] = useRecoilState(tripState);
  const hasValidStation = useRecoilValue(hasStationSelector);
  const onMinProfitChange = (_: any, value: number | number[]) =>
    minProfitSetter(setTripState)(value as number);
  const onMinRoiChange = (_: any, value: number | number[]) =>
    minRoiSetter(setTripState)(value as number);
  const onMaxBudgetChange = (_: any, value: number | number[]) =>
    maxBudgetSetter(setTripState)(value as number);
  const onTaxChange = (event: SelectChangeEvent<number>) =>
    taxSetter(setTripState)(Number(event.target.value));
  const onFromChange = (currentValue: StationEnum, value: boolean) =>
    fromSetter(setTripState)(from, currentValue, value);
  const onToChange = (currentValue: StationEnum, value: boolean) =>
    toSetter(setTripState)(to, currentValue, value);
  const onOtherCargoChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => otherCargoSetter(setTripState)(event.target.value);

  const isFormValid = hasValidStation;

  const onRouteClick = () => {
    if (!isFormValid) {
      return;
    }
    generateIdSetter(setTripState)();
    navigate(navigateTo);
  };

  useEffect(() => {
    clearOtherCargoSetter(setTripState)();
    if (isConnected && balance > 0) {
      onMaxBudgetChange(undefined, balance);
    }
  }, []);

  return (
    <>
      <Typography variant="h3" mb={5}>
        Configure your route
      </Typography>
      <Stack direction="column" spacing={2}>
        {/* From */}
        <Stack direction="row" spacing={3}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              From
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4}>
            {Object.entries(StationEnum)
              .filter(([key]) => key !== "None")
              .map(([key, value], index) => (
                <Stack key={value} direction="row" alignItems="center">
                  <Typography
                    sx={{ width: 50, cursor: "pointer" }}
                    textAlign="right"
                    onClick={() => onFromChange(value, !from[index])}
                  >
                    {key}
                  </Typography>
                  <Checkbox
                    checked={from[index]}
                    onChange={(event) =>
                      onFromChange(value, event.target.checked)
                    }
                  />
                </Stack>
              ))}
          </Stack>
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
                  <Typography
                    sx={{ width: 50, cursor: "pointer" }}
                    textAlign="right"
                    onClick={() => onToChange(value, !to[index])}
                  >
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

        <Stack direction="row" justifyContent="center" spacing={5}>
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
          {/* m3 taken */}
          <Stack direction="row" spacing={3}>
            <Stack direction="row" alignItems="center">
              <Typography textAlign="right" whiteSpace="nowrap">
                Other Cargo (m³)
              </Typography>
            </Stack>
            <TextField
              onChange={onOtherCargoChange}
              value={otherCargo}
              type="number"
              sx={{ width: 100 }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={5} direction="row" justifyContent="center">
        <MainButton disabled={!isFormValid} onClick={onRouteClick}>
          Route
        </MainButton>
      </Stack>
    </>
  );
}

export default TripStationForm;
