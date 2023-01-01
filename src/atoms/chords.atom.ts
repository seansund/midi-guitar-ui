import {atomWithObservable} from "jotai/utils";

import {ChordsModel} from '../models';
import {getGuitarEventsApi, GuitarEventsApi} from "../services";

export const chordsAtom = atomWithObservable<ChordsModel>(
    () => {
        const service: GuitarEventsApi = getGuitarEventsApi();

        return service.chord()
    },
    {
        initialValue: {chords: []}
    }
)
