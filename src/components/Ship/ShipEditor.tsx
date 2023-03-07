import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChangeEvent } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  deleteShipSetter,
  editShipCargoVolumeSetter,
  editShipSetter,
  editShipStaticSetter,
  getShipByIndexSelector,
} from "../../recoil/ships";
import shipsState from "../../recoil/ships/atom";
import Input from "@mui/material/Input";
import { CargoBayType } from "../../enum";
import AutocompleteShip from "../AutocompleteShip";
import { EveShip } from "../../types";

type ShipEditorProps = {
  editing: boolean;
  index: number;
  editStart: (index: number) => void;
  editEnd: () => void;
};

function ShipEditor({ editing, index, editStart, editEnd }: ShipEditorProps) {
  const setShipsState = useSetRecoilState(shipsState);
  const ship = useRecoilValue(getShipByIndexSelector(index));
  const { name, cargoBay, static: staticData } = ship;
  const editShip = editShipSetter(setShipsState);
  const deleteShip = deleteShipSetter(setShipsState);
  const editShipCargoVolume = editShipCargoVolumeSetter(setShipsState);
  const editShipStatic = editShipStaticSetter(setShipsState);

  const onNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => editShip(index, { ...ship, name: event.target.value });
  const onCargoBayVolumeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: CargoBayType
  ) => editShipCargoVolume(index, type, Number(event.target.value));
  const onHullChange = (ship: EveShip) => {
    editShipStatic(index, ship);
    editShipCargoVolume(index, CargoBayType.Main, ship.capacity);
  };
  const isFormValid =
    name.length > 0 &&
    cargoBay.main.volume > 0 &&
    staticData.typeName.length > 0;

  return (
    <Paper
      elevation={10}
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
        <Stack justifyContent="center" sx={{ width: 210 }}>
          <Stack>
            {editing ? (
              <>
                <Input
                  defaultValue={name}
                  placeholder="Name"
                  onChange={onNameChange}
                  disableUnderline
                />
                <AutocompleteShip
                  onChange={onHullChange}
                  defaultValue={staticData.typeName}
                  placeholder="Hull"
                />
              </>
            ) : (
              <>
                <Typography textAlign="left">{name}</Typography>
                <Typography textAlign="left">{staticData.typeName}</Typography>
              </>
            )}
          </Stack>
        </Stack>

        <Stack justifyContent="center">
          {Object.entries(cargoBay).map(([_, { volume, type }], index) => (
            <Stack direction="row" key={index} justifyContent="flex-end">
              {editing ? (
                <Input
                  defaultValue={volume}
                  placeholder="Max"
                  type="number"
                  onChange={(
                    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => onCargoBayVolumeChange(event, type)}
                  disableUnderline
                  inputProps={{ style: { textAlign: "right", padding: 0 } }}
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
          onClick={() => {
            deleteShip(index);
            editEnd();
          }}
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
