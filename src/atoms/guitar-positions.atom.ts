import {atomWithObservable} from "jotai/utils";

import {GuitarPositionsModel} from '@/models';
import {getGuitarEventsApi, GuitarEventsApi} from "@/services";

export const guitarPositionsAtom = atomWithObservable<GuitarPositionsModel>(
    () => {
        const service: GuitarEventsApi = getGuitarEventsApi();

        return service.guitarPositions();
    },
    {
        initialValue: {positions: []}
    }
)
