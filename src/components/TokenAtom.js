import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const uToken = atom({
  key: "uToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const memNameToken = atom({
  key: "memNameToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const cbListToken = atom({
  key: "cbListToken",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const abListToken = atom({
  key: "abListToken",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const boxToken = atom({
  key: "boxToken",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const CorAToken = atom({
  key: "CorAToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});