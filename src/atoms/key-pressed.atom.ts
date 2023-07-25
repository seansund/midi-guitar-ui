import {atomWithObservable} from "jotai/utils";
import {getKeyPressedApi, KeyPressedApi} from "../services/key-pressed";

export const keyPressedAtom = atomWithObservable<string>(
    () => {
        const service: KeyPressedApi = getKeyPressedApi();

        return service.keyBuffer();
    },
    {
        initialValue: ''
    }
)
