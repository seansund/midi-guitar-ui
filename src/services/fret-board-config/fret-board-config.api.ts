import {Observable} from "rxjs";

import {FretBoardConfigModel, FretBoardModeModel, KeyModel} from "@/models";

export const defaultFretBoardMode: FretBoardModeModel = {mode: 'notes', label: 'Notes'};
export const defaultKey: KeyModel = {key: 'G', label: 'G / e'}

export abstract class FretBoardConfigApi {
    abstract getAvailableModes(): Observable<FretBoardModeModel[]>;
    abstract getAvailableKeys(): Observable<KeyModel[]>;
    abstract setMode(mode: string): Observable<FretBoardConfigModel>;
    abstract setKey(key: string): Observable<FretBoardConfigModel>;
    abstract config(skipQuery?: boolean): Observable<FretBoardConfigModel>;
}
