import {FretBoardLabelsApi} from './fret-board-labels.api';
import {FretBoardLabelsGraphql} from "./fret-board-labels.graphql";

export * from './fret-board-labels.api'

let _instance: FretBoardLabelsApi;
export const getFretLabelsApi = () => _instance ? _instance : _instance = new FretBoardLabelsGraphql();
