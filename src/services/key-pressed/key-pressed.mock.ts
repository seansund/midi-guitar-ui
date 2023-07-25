import {BehaviorSubject, Observable} from "rxjs";

import {KeyPressedApi} from "./key-pressed.api";

export class KeyPressedMock implements KeyPressedApi {

    subject: BehaviorSubject<string>

    constructor() {
        this.subject = new BehaviorSubject("")
    }

    getKeyBuffer(): string {
        return this.subject.getValue();
    }

    keyBuffer(): Observable<string> {
        return this.subject;
    }

}