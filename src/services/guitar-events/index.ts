import {GuitarEventsApi} from "./guitar-events.api";
import {GuitarEventsMock} from "./guitar-events.mock";

export * from './guitar-events.api';

let _instance: GuitarEventsApi;
export const getGuitarEventsApi = () => _instance ? _instance : _instance = new GuitarEventsMock();
