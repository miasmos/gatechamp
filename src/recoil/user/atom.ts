import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface UserState {
  loggedIn: boolean;
  loginExpiresAt: Date | undefined;
  activeCharacter: number;
}

const userState = atom<UserState>({
  key: "UserState",
  default: {
    loggedIn: false,
    loginExpiresAt: undefined,
    activeCharacter: -1,
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
export type { UserState };
