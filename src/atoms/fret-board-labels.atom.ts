import {atomWithObservable} from "jotai/utils";

import {FretBoardLabelsModel} from '@/models';
import {FretBoardLabelsApi, getFretLabelsApi} from "@/services";

export const fretBoardLabelsAtom = atomWithObservable<FretBoardLabelsModel>(
    () => {
        const service: FretBoardLabelsApi = getFretLabelsApi();

        return service.fretBoardLabels()
    },
    {
        initialValue: {labels: []}
    }
)
