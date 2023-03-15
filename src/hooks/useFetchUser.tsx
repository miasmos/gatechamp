import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWRImmutable from "swr/immutable";
import { get } from "../api";
import { isSubscribedSetter } from "../recoil/user";
import userState from "../recoil/user/atom";

type FetchUserResponse = {
  isSubscribed: boolean;
};

function useFetchUser(loggedIn: boolean) {
  const setUserState = useSetRecoilState(userState);
  const setIsSubscribed = isSubscribedSetter(setUserState);
  const {
    data = {
      isSubscribed: undefined,
    },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<FetchUserResponse>(
    loggedIn ? `/api/user/get` : null,
    get
  );

  useEffect(() => {
    if (data && typeof data.isSubscribed === "boolean") {
      setIsSubscribed(data.isSubscribed);
    }
  }, [data]);

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchUser;
