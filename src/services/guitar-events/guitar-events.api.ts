import {Observable} from "rxjs";

import {ChordsModel, GuitarPositionModel, GuitarPositionsModel} from "@/models";

export abstract class GuitarEventsApi {
    abstract chord(): Observable<ChordsModel>;

    abstract guitarPositions(): Observable<GuitarPositionsModel>;

    abstract pressNote(variables: {stringIndex: number, fretIndex: number}): Promise<GuitarPositionModel[]>;
}
