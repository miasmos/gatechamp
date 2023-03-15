import { useEffect, useState } from "react";
import { PaymentProvider } from "../../enum";
import CheckoutStatusCcp from "./ccp/CheckoutStatusCcp";
import CheckoutStatusStripe from "./stripe/CheckoutStatusStripe";
import StripeContainer from "./stripe/StripeContainer";

function CheckoutStatus() {
  const [provider, setProvider] = useState<PaymentProvider | undefined>(
    undefined
  );
  const [secret, setSecret] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("provider") as PaymentProvider;
    switch (provider) {
      case PaymentProvider.Stripe:
        const clientSecret = params.get("payment_intent_client_secret");
        setSecret(clientSecret || undefined);
        break;
      case PaymentProvider.Ccp:
    }

    setProvider(provider);
  }, []);

  switch (provider) {
    case PaymentProvider.Stripe:
      return (
        <StripeContainer clientSecret={secret}>
          <CheckoutStatusStripe clientSecret={secret} />
        </StripeContainer>
      );
    case PaymentProvider.Ccp:
      return <CheckoutStatusCcp />;
    default:
      return null;
  }
}

export default CheckoutStatus;
