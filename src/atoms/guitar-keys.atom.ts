import {atomWithObservable} from "jotai/utils";

import {KeyModel} from '@/models';
import {defaultKey, FretBoardConfigApi, getFretBoardConfigApi} from "@/services";

export const guitarKeysAtom = atomWithObservable<KeyModel[]>(
    () => {
        const service: FretBoardConfigApi = getFretBoardConfigApi();

        return service.getAvailableKeys();
    },
    {
        initialValue: [defaultKey]
    }
)
