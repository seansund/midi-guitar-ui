import {atom} from 'jotai';

import {fretBoardConfigAtom} from "./fret-board-config.atom";

export const guitarKeyAtom = atom<string>(get => get(fretBoardConfigAtom).key)
