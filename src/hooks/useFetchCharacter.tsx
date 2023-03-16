import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useSWRImmutable from "swr/immutable";
import { get } from "../api";
import { characterSetter } from "../recoil/user";
import userState, { Character } from "../recoil/user/atom";

function useFetchCharacter(loggedIn: boolean) {
  const setUserState = useSetRecoilState(userState);
  const setCharacter = characterSetter(setUserState);
  const {
    data = {
      ancestry_id: 0,
      birthday: new Date(),
      bloodline_id: 0,
      corporation_id: 0,
      description: "",
      gender: "",
      name: "",
      race_id: 0,
      security_status: 0,
      character_id: 0,
    },
    error,
    isLoading,
    isValidating,
  } = useSWRImmutable<Character>(loggedIn ? `/api/user/character` : null, get);

  useEffect(() => {
    if (data && data.name.length > 0) {
      setCharacter(data);
    }
  }, [data]);

  return { data, isLoading, isValidating, hasError: error };
}

export default useFetchCharacter;
