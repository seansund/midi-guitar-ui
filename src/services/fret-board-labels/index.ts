import {FretBoardLabelsApi} from './fret-board-labels.api';
import {FretBoardLabelsMock} from './fret-board-labels.mock';

export * from './fret-board-labels.api'

let _instance: FretBoardLabelsApi;
export const getFretLabelsApi = () => _instance ? _instance : _instance = new FretBoardLabelsMock();
