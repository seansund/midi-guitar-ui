import {atom} from 'jotai';

import {FretBoardModeModel} from '../models';
import {defaultFretBoardMode} from "../services";

export const fretBoardModesAtom = atom<FretBoardModeModel[]>([defaultFretBoardMode])
