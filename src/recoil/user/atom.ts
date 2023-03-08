import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface UserState {
  loggedIn: boolean;
  isConnected: boolean;
  loginExpiresAt: string | undefined;
  activeCharacter: number;
  character: Record<string, Character>;
}

interface Character {
  alliance_id?: number;
  faction_id?: number;
  title?: string;
  ancestry_id: number;
  birthday: Date;
  bloodline_id: number;
  corporation_id: number;
  description: string;
  gender: string;
  name: string;
  race_id: number;
  security_status: number;
}

const userState = atom<UserState>({
  key: "UserState",
  default: {
    loggedIn: false,
    isConnected: false,
    loginExpiresAt: undefined,
    activeCharacter: -1,
    character: {},
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
export type { UserState, Character };