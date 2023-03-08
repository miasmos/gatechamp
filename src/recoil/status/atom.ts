import { atom } from "recoil";

type UserStatus = {
  online: boolean;
  lastLogin: String;
  lastLogout: String;
  location: {
    solarSystemID: number;
    stationID: number | undefined;
    structureID: number | undefined;
    solarSystemName: string;
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
        stationID: undefined,
        structureID: undefined,
        solarSystemName: "",
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
