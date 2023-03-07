import Cookies from "js-cookie";
import useSWRImmutable from "swr/immutable";
import { get } from "../api";

type UserCharacter = {
  name: string;
};

function useFetchCharacter(loggedIn: boolean) {
  const {
    data = { name: "" },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<UserCharacter>(
    loggedIn ? `/api/user/character` : null,
    get
  );
  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchCharacter;
