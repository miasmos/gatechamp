import { useEffect } from "react";
import { Navigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AppRoute } from "../../enum";
import useFetchSubscriptionProduct from "../../hooks/useFetchSubscriptionProduct";
import usePageTitle from "../../hooks/usePageTitle";
import { productSelector } from "../../recoil/checkout";
import checkoutState from "../../recoil/checkout/atom";
import productSetter from "../../recoil/checkout/setters/productSetter";
import { isLoggedInSelector, isSubscribedSelector } from "../../recoil/user";
import Loading from "../Loading";

function CheckoutStart() {
  usePageTitle("Checkout");
  const isSubscribed = useRecoilValue(isSubscribedSelector);
  const setCheckoutState = useSetRecoilState(checkoutState);
  const product = useRecoilValue(productSelector);
  const setProduct = productSetter(setCheckoutState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const { data } = useFetchSubscriptionProduct(!product);

  useEffect(() => {
    if (data) {
      setProduct(data, 0);
    }
  }, [data]);

  if (isSubscribed) {
    return <Navigate to=".." />;
  }

  if (!product) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return (
      <Navigate to={`../${AppRoute.Login}`} state={{ to: AppRoute.Checkout }} />
    );
  }

  return <Navigate to={AppRoute.ProviderSelector} />;
}

export default CheckoutStart;
