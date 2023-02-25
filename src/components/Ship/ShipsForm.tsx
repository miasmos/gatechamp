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
} from "../../recoil/ships";
import ShipEditor from "./ShipEditor";
import { addShipSetter } from "../../recoil/ships";
import { AppRoute, CargoBayType } from "../../enum";
import { useNavigate } from "react-router";
import { NavigationIntention } from "../../types";

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
  const addShip = addShipSetter(setShipsState);
  const deleteShip = deleteShipSetter(setShipsState);

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
        <Stack direction="column" spacing={2}>
          {ships.ships.map((ship, index) => (
            <ShipEditor
              key={ship.id}
              {...ship}
              editing={isEditing && editingIndex === index}
              index={index}
              editStart={editStart}
              editEnd={editEnd}
              onDelete={deleteShip}
            />
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
      <Stack mt={5}>
        <Button
          sx={{ height: 60 }}
          variant="contained"
          disabled={!isFormValid}
          onClick={onNextClick}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

export default ShipsForm;
