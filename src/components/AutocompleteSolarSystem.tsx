import {
  Stack,
  Autocomplete as MuiAutocomplete,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import useFetchAutocomplete, {
  AutocompleteType,
} from "../hooks/useFetchAutocomplete";
import { EveSolarSystem } from "../types";

type AutocompleteProps = {
  onChange: (solarSystem: EveSolarSystem) => void;
  onInputChange?: (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => void;
  defaultValue?: string;
  value?: string;
  controlled?: boolean;
  disabled?: boolean;
};

function AutocompleteSolarSystem({
  onChange,
  onInputChange,
  value,
  defaultValue = "",
  controlled = false,
  disabled = false,
}: AutocompleteProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string>(defaultValue);
  const { data, isLoading, isValidating, hasError } =
    useFetchAutocomplete<EveSolarSystem>(
      controlled ? value! : uncontrolledValue,
      AutocompleteType.SolarSystem
    );

  const onUncontrolledInputChange = (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => setUncontrolledValue(nextValue);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MuiAutocomplete
        freeSolo
        disabled={disabled}
        id="autocomplete"
        disableClearable
        options={data.hits.hits}
        clearIcon={<ClearIcon fontSize="small" />}
        onChange={(_, { _source }: any) => onChange(_source)}
        isOptionEqualToValue={({ _source: s1 }, { _source: s2 }) => s1 === s2}
        inputValue={controlled ? value : uncontrolledValue}
        onInputChange={controlled ? onInputChange : onUncontrolledInputChange}
        getOptionLabel={({ _source }: any) => _source.solarSystemName}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}

export default AutocompleteSolarSystem;
