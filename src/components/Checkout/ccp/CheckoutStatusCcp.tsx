import { Stack } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import useFetchPaymentStatus from "../../../hooks/useFetchPaymentStatus";
import { generateId } from "../../../util/math";
import ProgressTimer from "../../ProgressTimer";
import CheckoutStatusState, { CheckoutStatus } from "../CheckoutStatusState";

type CheckoutStatusCcpProps = {
  invoiceId: string | undefined;
};

function CheckoutStatusCcp({ invoiceId }: CheckoutStatusCcpProps) {
  const [uuid, setUuid] = useState<string>("1");
  const { data, hasError } = useFetchPaymentStatus(invoiceId, uuid);
  const { status } = data;

  let checkoutStatus: CheckoutStatus;
  const showTimer = status !== "active";
  switch (status) {
    case "active":
      checkoutStatus = CheckoutStatus.Success;
      break;
    default:
      checkoutStatus = CheckoutStatus.Waiting;
      break;
  }

  useInterval(
    () => setUuid(generateId()),
    checkoutStatus === CheckoutStatus.Waiting ? 30000 : null
  );

  if (hasError) {
    switch (hasError.response.status) {
      case 404:
        return <Navigate to="../.." />;
    }
  }

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="center"
      width="100%"
    >
      <Stack direction="column" alignItems="center">
        <Stack height={22}>
          {showTimer && (
            <ProgressTimer minutes={60} size={65} thickness={4} hideProgress />
          )}
        </Stack>
        <CheckoutStatusState status={checkoutStatus} />
      </Stack>
    </Stack>
  );
}

export default CheckoutStatusCcp;
