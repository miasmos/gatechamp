import { Checkbox as MuiCheckbox } from "@mui/material";
import { CheckboxProps } from "@mui/material/Checkbox";

function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox size="small" {...props} />;
}

export default Checkbox;
