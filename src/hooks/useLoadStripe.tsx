import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { STRIPE_CLIENT_KEY } from "../constants";

let didLoadStripe = false;

function useLoadStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    (async () => {
      if (!didLoadStripe) {
        didLoadStripe = true;
        const stripe = await loadStripe(STRIPE_CLIENT_KEY);
        setStripe(stripe);
      }
    })();
  }, []);

  return stripe;
}

export default useLoadStripe;
