import {Observable} from "rxjs";

export abstract class KeyPressedApi {

    abstract getKeyBuffer(): string;

    abstract keyBuffer(): Observable<string>;

}
