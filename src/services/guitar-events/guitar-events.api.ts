import {Observable} from "rxjs";

import {ChordsModel, GuitarPositionsModel} from "../../models";

export abstract class GuitarEventsApi {
    abstract chord(): Observable<ChordsModel>;

    abstract guitarPositions(): Observable<GuitarPositionsModel>;
}
