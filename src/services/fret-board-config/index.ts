import {FretBoardConfigApi} from "./fret-board-config.api";
import {FretBoardConfigGraphql} from "./fret-board-config.graphql";

export * from './fret-board-config.api'

let _instance: FretBoardConfigApi;
export const getFretBoardConfigApi = () => _instance ? _instance : _instance = new FretBoardConfigGraphql();
