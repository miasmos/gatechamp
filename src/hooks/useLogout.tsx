import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loggedInSetter } from "../recoil/user";
import userState from "../recoil/user/atom";
import useFetchLogout from "./useFetchLogout";

function useLogout() {
  const [{ shouldLogout }, setState] = useState<{ shouldLogout: boolean }>({
    shouldLogout: false,
  });
  const setUserState = useSetRecoilState(userState);
  const setLoggedIn = loggedInSetter(setUserState);

  useFetchLogout(shouldLogout);

  const onLogoutClick = () => {
    setLoggedIn(false);
    setState((state) => ({ ...state, shouldLogout: true }));
  };

  useEffect(() => {
    if (shouldLogout) {
      setState((state) => ({ ...state, shouldLogout: false }));
    }
  }, [shouldLogout]);

  return {
    logout: onLogoutClick,
  };
}

export default useLogout;
