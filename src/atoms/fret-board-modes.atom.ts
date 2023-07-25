import {atomWithObservable} from "jotai/utils";

import {FretBoardModeModel} from '../models';
import {defaultFretBoardMode, FretBoardConfigApi, getFretBoardConfigApi} from "../services";

export const fretBoardModesAtom = atomWithObservable<FretBoardModeModel[]>(
    () => {
        const service: FretBoardConfigApi = getFretBoardConfigApi();

        return service.getAvailableModes();
    },
    {
        initialValue: [defaultFretBoardMode]
    }
)
