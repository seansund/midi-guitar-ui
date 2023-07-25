import {KeyPressedApi} from "./key-pressed.api";
import {KeyPressedGraphql} from "./key-pressed.graphql";

export * from './key-pressed.api'

let _instance: KeyPressedApi;

export const getKeyPressedApi = () => _instance ? _instance : _instance = new KeyPressedGraphql()
