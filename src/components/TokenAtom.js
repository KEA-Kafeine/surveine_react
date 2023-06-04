import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const uToken = atom({
  key: "uToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});