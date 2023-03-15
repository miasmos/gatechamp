import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";
import useLoadStripe from "../../../hooks/useLoadStripe";
import { fontFamily, palette } from "../../../theme";

type StripeContainerProps = {
  children: ReactNode;
  clientSecret: string | undefined;
};

function StripeContainer({ children, clientSecret }: StripeContainerProps) {
  const stripe = useLoadStripe();
  if (!clientSecret || !stripe) {
    return null;
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        appearance: {
          variables: {
            fontFamily,
            colorPrimary: palette.palette.primary.main,
            colorText: palette.palette.primary.main,
            borderRadius: "4px",
            fontSizeBase: "16px",
            fontSizeSm: "16px",
          },
          rules: {
            ".Input": {
              padding: "16.5px 13px 16.5px 15px",
              borderColor: palette.palette.primary.main,
            },
            ".Input:focus": {
              outline: "none",
              border: "2px solid",
              boxShadow: "none",
              borderColor: palette.palette.primary.main,
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}

export default StripeContainer;
