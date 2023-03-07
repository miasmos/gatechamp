import { atom } from "recoil";

type UserStatus = {
  online: boolean;
  lastLogin: String;
  lastLogout: String;
  location: {
    solarSystemID: number;
    stationID: number;
    structureID: number;
  };
  ship: {
    itemID: number;
    name: string;
    typeID: number;
  };
};

interface StatusState {
  status: UserStatus;
  isSubscribed: boolean;
}

const statusState = atom<StatusState>({
  key: "StatusState",
  default: {
    isSubscribed: false,
    status: {
      online: false,
      lastLogin: "",
      lastLogout: "",
      location: {
        solarSystemID: 0,
        stationID: 0,
        structureID: 0,
      },
      ship: {
        itemID: 0,
        name: "",
        typeID: 0,
      },
    },
  },
});

export default statusState;
export type { UserStatus, StatusState };
