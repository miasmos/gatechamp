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
import { EveShip } from "../types";

type AutocompleteProps = {
  onChange: (ship: EveShip) => void;
  defaultValue?: string;
  placeholder?: string;
};

function AutocompleteShip({
  onChange,
  defaultValue = "",
  placeholder = "",
}: AutocompleteProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const { data, isLoading, isValidating, hasError } =
    useFetchAutocomplete<EveShip>(value, AutocompleteType.Ship);

  const onInputChange = (
    _: SyntheticEvent<Element, Event>,
    nextValue: string
  ) => setValue(nextValue);

  return (
    <Stack spacing={2}>
      <MuiAutocomplete
        freeSolo
        id="autocomplete"
        disableClearable
        options={data.hits.hits}
        clearIcon={<ClearIcon fontSize="small" />}
        onChange={(_, { _source }: any) => onChange(_source)}
        isOptionEqualToValue={({ _source: s1 }, { _source: s2 }) => s1 === s2}
        inputValue={value}
        onInputChange={onInputChange}
        getOptionLabel={({ _source }: any) => _source.typeName}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
              disableUnderline: true,
            }}
            placeholder={placeholder}
            variant="standard"
          />
        )}
      />
    </Stack>
  );
}

export default AutocompleteShip;
