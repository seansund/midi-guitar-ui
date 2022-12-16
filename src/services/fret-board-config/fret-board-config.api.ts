import {Observable} from "rxjs";

import {FretBoardConfigModel, FretBoardModeModel, KeyModel} from "../../models";

export const defaultFretBoardMode: FretBoardModeModel = {mode: 'notes', label: 'Notes'};
export const defaultKey: KeyModel = {key: 'G', label: 'G / e'}

export abstract class FretBoardConfigApi {
    abstract getAvailableModes(): Observable<FretBoardModeModel[]>;
    abstract getAvailableKeys(): Observable<KeyModel[]>;
    abstract setMode(mode: FretBoardModeModel): Observable<FretBoardConfigModel>;
    abstract setKey(key: KeyModel): Observable<FretBoardConfigModel>;
    abstract config(): Observable<FretBoardConfigModel>;
}
