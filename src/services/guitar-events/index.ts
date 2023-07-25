import {GuitarEventsApi} from "./guitar-events.api";
import {GuitarEventsGraphql} from "./guitar-events.graphql";

export * from './guitar-events.api';

let _instance: GuitarEventsApi;
export const getGuitarEventsApi = () => _instance ? _instance : _instance = new GuitarEventsGraphql();
