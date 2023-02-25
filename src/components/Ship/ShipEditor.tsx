import { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import {
  deleteShipSetter,
  editShipCargoVolumeSetter,
  editShipSetter,
  Ship,
} from "../../recoil/ships";
import shipsState from "../../recoil/ships/atom";
import Input from "@mui/material/Input";
import { CargoBayType } from "../../enum";

type ShipEditorProps = Ship & {
  editing: boolean;
  index: number;
  onDelete: (index: number) => void;
  editStart: (index: number) => void;
  editEnd: () => void;
};

function ShipEditor({
  editing,
  index,
  editStart,
  editEnd,
  onDelete,
  ...ship
}: ShipEditorProps) {
  const { name, cargoBay } = ship;
  const setShipsState = useSetRecoilState(shipsState);
  const editShip = editShipSetter(setShipsState);
  const deleteShip = deleteShipSetter(setShipsState);
  const editShipCargoVolume = editShipCargoVolumeSetter(setShipsState);

  const onNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => editShip(index, { ...ship, name: event.target.value });
  const onCargoBayVolumeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: CargoBayType
  ) => editShipCargoVolume(index, type, Number(event.target.value));
  const isFormValid = name.length > 0 && cargoBay.main.volume > 0;

  return (
    <Paper
      sx={{
        position: "relative",
        ".ship-editor__actions": {
          opacity: editing ? 1 : 0,
        },
        "&:hover": {
          ".ship-editor__actions": {
            opacity: 1,
          },
        },
      }}
    >
      <Stack
        my={2}
        mx={3}
        direction="row"
        height={40}
        justifyContent="space-between"
      >
        <Stack justifyContent="center">
          {editing ? (
            <Input
              defaultValue={name}
              placeholder="Name"
              onChange={onNameChange}
              disableUnderline
              sx={{ width: 80 }}
            />
          ) : (
            <Typography>{name}</Typography>
          )}
        </Stack>
        <Stack justifyContent="center">
          {Object.entries(cargoBay).map(([key, { volume, type }], index) => (
            <Stack direction="row" key={index}>
              {editing ? (
                <Input
                  defaultValue={volume}
                  placeholder="Max"
                  type="number"
                  onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => onCargoBayVolumeChange(event, type)}
                  disableUnderline
                  inputProps={{ style: { textAlign: "right" } }}
                  sx={{ width: 80 }}
                />
              ) : (
                volume
              )}
              <Stack direction="row" alignItems="center">
                <Typography>m³</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack
        className="ship-editor__actions"
        spacing={0.5}
        position="absolute"
        top="50%"
        height="100%"
        left={-36}
        justifyContent="center"
        sx={{
          transform: "translateY(-50%)",
          px: 1,
          opacity: 0,
        }}
      >
        <CloseIcon
          sx={{ cursor: "pointer" }}
          fontSize="small"
          color="primary"
          onClick={() => deleteShip(index)}
        />
        {!editing && (
          <EditIcon
            sx={{ cursor: "pointer" }}
            fontSize="small"
            color="primary"
            onClick={() => !editing && editStart(index)}
          />
        )}
        {editing && (
          <CheckIcon
            sx={{ cursor: isFormValid ? "pointer" : "default" }}
            fontSize="small"
            color={isFormValid ? "primary" : "disabled"}
            onClick={() => editing && isFormValid && editEnd()}
          />
        )}
      </Stack>
    </Paper>
  );
}

export default ShipEditor;
