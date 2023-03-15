import Stack from "@mui/material/Stack/Stack";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSetRecoilState } from "recoil";
import { APP_API_DOMAIN } from "../../constants";
import { AppRoute } from "../../enum";
import { redirectSetter } from "../../recoil/user";
import userState from "../../recoil/user/atom";
import LogInIcon from "../icon/LogInIcon";
import Link from "../Link";

function LoginContainer() {
  const location = useLocation();
  const setUserState = useSetRecoilState(userState);
  const setRedirect = redirectSetter(setUserState);
  const to = location.state?.to || AppRoute.Home;

  useEffect(() => {
    setRedirect(to);
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center" width="100%">
      <Link href={`${APP_API_DOMAIN}/api/auth/login`}>
        <LogInIcon width={220} />
      </Link>
    </Stack>
  );
}

export default LoginContainer;
