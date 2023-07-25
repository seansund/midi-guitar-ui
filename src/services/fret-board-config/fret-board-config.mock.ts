import {BehaviorSubject, from, Observable} from "rxjs";

import {defaultFretBoardMode, defaultKey, FretBoardConfigApi} from "./fret-board-config.api";
import {FretBoardConfigModel, FretBoardModeModel, KeyModel} from "../../models";

const modes: FretBoardModeModel[] = [
    defaultFretBoardMode,
    {mode: 'keyboard-major', label: 'Keyboard Major Scale'},
    {mode: 'keyboard-pentatonic', label: 'Keyboard Pentatonic'},
    {mode: 'keyboard-harmonic-minor', label: 'Keyboard Harmonic Minor'},
]

const keys: KeyModel[] = [
    defaultKey,
    {key: 'G#', label: 'G# / f'},
    {key: 'A', label: 'A / f#'},
    {key: 'A#', label: 'A# / g'},
    {key: 'B', label: 'B / g#'},
    {key: 'C', label: 'C / a'},
    {key: 'C#', label: 'C# / a#'},
    {key: 'D', label: 'D / b'},
    {key: 'D#', label: 'D# / c'},
    {key: 'E', label: 'E / c#'},
    {key: 'F', label: 'F / d'},
    {key: 'F#', label: 'F# / d#'},
]

export class FretBoardConfigMock implements FretBoardConfigApi {

    subject: BehaviorSubject<FretBoardConfigModel>;

    constructor() {
        this.subject = new BehaviorSubject<FretBoardConfigModel>({
            mode: defaultFretBoardMode.mode,
            key: defaultKey.key,
        })
    }

    getAvailableModes(): Observable<FretBoardModeModel[]> {
        return from([modes]);
    }

    getAvailableKeys(): Observable<KeyModel[]> {
        return from([keys]);
    }

    config(): Observable<FretBoardConfigModel> {
        return this.subject;
    }

    setKey(key: string): Observable<FretBoardConfigModel> {
        const current: FretBoardConfigModel = this.subject.value;

        if (current.key === key) {
            return from([current]);
        }

        const next: FretBoardConfigModel = {mode: current.mode, key};

        this.subject.next(next)

        return from([next]);
    }

    setMode(mode: string): Observable<FretBoardConfigModel> {
        const current: FretBoardConfigModel = this.subject.value;

        if (current.mode === mode) {
            return from([current]);
        }

        const next: FretBoardConfigModel = {mode, key: current.key};

        this.subject.next(next)

        return from([next]);
    }

}