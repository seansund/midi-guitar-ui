import {atomWithObservable} from "jotai/utils";

import {FretBoardConfigModel} from "../models";
import {defaultFretBoardMode, defaultKey, FretBoardConfigApi, getFretBoardConfigApi} from "../services";

export const fretBoardConfigAtom = atomWithObservable<FretBoardConfigModel>(
    () => {
        const service: FretBoardConfigApi = getFretBoardConfigApi();

        return service.config();
    },
    {
        initialValue: {
            mode: defaultFretBoardMode.mode,
            key: defaultKey.key
        }
    }
)
