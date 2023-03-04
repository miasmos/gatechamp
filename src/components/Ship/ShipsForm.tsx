import { useState } from "react";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import shipsState from "../../recoil/ships/atom";
import {
  deleteShipSetter,
  getShipCountSelector,
  hasValidShipSelector,
  selectAllShipSetter,
  selectShipSetter,
} from "../../recoil/ships";
import ShipEditor from "./ShipEditor";
import { addShipSetter } from "../../recoil/ships";
import { CargoBayType } from "../../enum";
import { useNavigate } from "react-router";
import { NavigationIntention } from "../../types";
import MainButton from "../MainButton";
import { Checkbox } from "@mui/material";
import getAreAllShipsSelected from "../../recoil/ships/selectors/getAreAllShipsSelectedSelector";

type ShipsFormProps = NavigationIntention;

function ShipsForm({ to }: ShipsFormProps) {
  const navigate = useNavigate();
  const [{ editingIndex, isEditing }, setFormState] = useState<{
    editingIndex: number;
    isEditing: boolean;
  }>({ editingIndex: -1, isEditing: false });

  const [ships, setShipsState] = useRecoilState(shipsState);
  const hasValidShip = useRecoilValue(hasValidShipSelector);
  const shipCount = useRecoilValue(getShipCountSelector);
  const areAllShipsSelected = useRecoilValue(getAreAllShipsSelected);
  const addShip = addShipSetter(setShipsState);

  const isFormValid = hasValidShip && !isEditing;

  const onNextClick = () => {
    if (!isFormValid) {
      return;
    }
    navigate(to);
  };
  const onAddShipClick = () => {
    if (isEditing) {
      return;
    }
    addShip({
      name: "",
      static: {
        typeID: 0,
        typeName: "",
        capacity: 0,
        graphicID: 0,
      },
      cargoBay: {
        main: {
          volume: 0,
          type: CargoBayType.Main,
        },
        fleetHanger: {
          volume: 0,
          type: CargoBayType.FleetHanger,
        },
      },
    });
    setFormState((state) => ({
      ...state,
      editingIndex: shipCount,
      isEditing: true,
    }));
  };
  const onSelectShipClick = (index: number, value: boolean) =>
    selectShipSetter(setShipsState)(ships.shipsSelected, index, value);
  const onSelectAllShipClick = (value: boolean) =>
    selectAllShipSetter(setShipsState)(ships.shipsSelected, value);
  const editStart = (index: number) =>
    setFormState((state) => ({
      ...state,
      editingIndex: index,
      isEditing: true,
    }));
  const editEnd = () =>
    setFormState((state) => ({
      ...state,
      editingIndex: -1,
      isEditing: false,
    }));

  return (
    <>
      <Typography variant="h4" mb={5}>
        Add your ships
      </Typography>
      <Stack>
        <Stack>
          <Stack
            flexShrink={1}
            direction="column"
            alignItems="flex-end"
            pr={2.2}
          >
            <Checkbox
              checked={areAllShipsSelected}
              onClick={() => onSelectAllShipClick(!areAllShipsSelected)}
            />
          </Stack>
        </Stack>
        <Stack>
          <Stack
            direction="column"
            pl={3.5}
            py={2}
            spacing={2}
            maxHeight={400}
            sx={{ overflowY: ships.ships.length > 4 ? "scroll" : "auto" }}
          >
            {ships.ships.map((ship, index) => (
              <Stack direction="row" key={ship.id}>
                <Stack flexGrow={1}>
                  <ShipEditor
                    editing={isEditing && editingIndex === index}
                    index={index}
                    editStart={editStart}
                    editEnd={editEnd}
                  />
                </Stack>
                <Stack justifyContent="center">
                  <Checkbox
                    disabled={editingIndex === index}
                    checked={ships.shipsSelected[index]}
                    onChange={() =>
                      onSelectShipClick(index, !ships.shipsSelected[index])
                    }
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack alignItems="center" mt={2}>
            <Button
              sx={{ width: 135 }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={onAddShipClick}
              disabled={isEditing}
            >
              Add Ship
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" mt={5} justifyContent="center">
        <MainButton disabled={!isFormValid} onClick={onNextClick}>
          Next
        </MainButton>
      </Stack>
    </>
  );
}

export default ShipsForm;
