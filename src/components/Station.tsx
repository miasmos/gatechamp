import { useState } from "react";

import StationForm, { StationFormState } from "./StationForm";
import StationResult from "./StationResult";

interface StationState {
  form: StationFormState | undefined;
  isFormSubmitted: boolean;
}

function Station() {
  const [{ form, isFormSubmitted }, setState] = useState<StationState>({
    form: undefined,
    isFormSubmitted: false,
  });

  const onFormSubmit = (formState: StationFormState) =>
    setState((state) => ({ ...state, form: formState, isFormSubmitted: true }));
  const onReset = () =>
    setState((state) => ({
      ...state,
      form: undefined,
      isFormSubmitted: false,
    }));

  return (
    <>
      {!isFormSubmitted && <StationForm onSubmit={onFormSubmit} />}
      {isFormSubmitted && <StationResult form={form!} onReset={onReset} />}
    </>
  );
}

export default Station;
export type { StationState };
