import { selector } from "recoil";
import statusState from "../atom";

const getPersonalWalletBalance = selector({
  key: "StatusState:GetPersonalWallet",
  get: ({ get }) => get(statusState).status.wallet.personal,
});

export default getPersonalWalletBalance;
