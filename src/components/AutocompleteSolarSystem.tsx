import {
  Stack,
  Autocomplete as MuiAutocomplete,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import useFetchAutocomplete, {
  AutocompleteType,
} from "../hooks/useFetchAutocomplete";
import { SolarSystem } from "../types";

type AutocompleteProps = {
  onChange: (solarSystem: SolarSystem) => void;
  defaultValue?: string;
};

function AutocompleteSolarSystem({
  onChange,
  defaultValue = "",
}: AutocompleteProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const { data, isLoading, isValidating, hasError } =
    useFetchAutocomplete<SolarSystem>(value, AutocompleteType.SolarSystem);

  const onInputChange = (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => setValue(nextValue);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MuiAutocomplete
        freeSolo
        id="autocomplete"
        disableClearable
        options={data.hits.hits}
        onChange={(_, { _source }: any) => onChange(_source)}
        isOptionEqualToValue={({ _source: s1 }, { _source: s2 }) => s1 === s2}
        inputValue={value}
        onInputChange={onInputChange}
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
