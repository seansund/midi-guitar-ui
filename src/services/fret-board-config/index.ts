import {FretBoardConfigApi} from "./fret-board-config.api";
import {FretBoardConfigMock} from "./fret-board-config.mock";

export * from './fret-board-config.api'

let _instance: FretBoardConfigApi;
export const getFretBoardConfigApi = () => _instance ? _instance : _instance = new FretBoardConfigMock();
