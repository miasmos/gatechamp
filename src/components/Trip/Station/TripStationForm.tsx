import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { formatCurrency } from "../../../util/currency";
import {
  RouteSecurity,
  Station as StationEnum,
  SystemSecurity,
  Tax,
} from "../../../enum";
import tripState, {
  fromSetter,
  generateIdSetter,
  hasAToStation,
  ignoreSecuritySetter,
  maxBudgetSetter,
  minProfitSetter,
  minRoiSetter,
  routeSafetySetter,
  taxSetter,
  toSetter,
} from "../../../recoil/trip";
import { NavigationIntention } from "../../../types";
import MainButton from "../../MainButton";

type TripStationProps = NavigationIntention;

function TripStationForm({ to: navigateTo }: TripStationProps) {
  const navigate = useNavigate();
  const [
    { from, to, maxBudget, minProfit, minRoi, routeSafety, security, tax },
    setTripState,
  ] = useRecoilState(tripState);
  const hasStation = useRecoilValue(hasAToStation);
  const onMinProfitChange = (_: any, value: number | number[]) =>
    minProfitSetter(setTripState)(value as number);
  const onMinRoiChange = (_: any, value: number | number[]) =>
    minRoiSetter(setTripState)(value as number);
  const onMaxBudgetChange = (_: any, value: number | number[]) =>
    maxBudgetSetter(setTripState)(value as number);
  const onSafetyChange = (event: SelectChangeEvent<RouteSecurity>) =>
    routeSafetySetter(setTripState)(event.target.value as RouteSecurity);
  const onTaxChange = (event: SelectChangeEvent<number>) =>
    taxSetter(setTripState)(Number(event.target.value));
  const onIgnoreSecurity = (currentValue: SystemSecurity, value: boolean) =>
    ignoreSecuritySetter(setTripState)(security, currentValue, value);
  const onFromChange = (currentValue: StationEnum, value: boolean) =>
    fromSetter(setTripState)(from, currentValue, value);
  const onToChange = (currentValue: StationEnum, value: boolean) =>
    toSetter(setTripState)(to, currentValue, value);

  const isFormValid = hasStation;

  const onRouteClick = () => {
    if (!isFormValid) {
      return;
    }
    generateIdSetter(setTripState)();
    navigate(navigateTo);
  };

  return (
    <>
      <Typography variant="h4" mb={5}>
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
                  <Typography sx={{ width: 50 }} textAlign="right">
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

        <Stack direction="row" justifyContent="center">
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
        <Stack direction="row" spacing={3} justifyContent="center">
          <Stack direction="row" alignItems="center">
            <Typography sx={{ width: 100 }} textAlign="right">
              Avoid
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
      <Stack mt={5} direction="row" justifyContent="center">
        <MainButton disabled={!isFormValid} onClick={onRouteClick}>
          Route
        </MainButton>
      </Stack>
    </>
  );
}

export default TripStationForm;
