import {atom} from "jotai";

import {fretBoardConfigAtom} from "./fret-board-config.atom";

export const fretBoardModeAtom = atom<string>(get => get(fretBoardConfigAtom).mode)
