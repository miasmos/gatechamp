import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PaymentProvider } from "../../enum";
import CheckoutStatusCcp from "./ccp/CheckoutStatusCcp";
import CheckoutStatusStripe from "./stripe/CheckoutStatusStripe";
import StripeContainer from "./stripe/StripeContainer";

function CheckoutStatus() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState<PaymentProvider | undefined>(
    undefined
  );
  const [secret, setSecret] = useState<string | undefined>(undefined);
  const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("provider") as PaymentProvider;
    const clientSecret = params.get("payment_intent_client_secret");
    const invoiceId = params.get("invoiceId");

    switch (provider) {
      case PaymentProvider.Stripe:
        setSecret(clientSecret || undefined);
        break;
      case PaymentProvider.Ccp:
        setInvoiceId(invoiceId || undefined);
        break;
    }

    if (!provider && !(clientSecret || invoiceId)) {
      navigate("../..");
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
      return <CheckoutStatusCcp invoiceId={invoiceId} />;
    default:
      return null;
  }
}

export default CheckoutStatus;
