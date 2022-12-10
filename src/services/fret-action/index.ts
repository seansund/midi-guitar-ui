import {FretActionApi} from './fret-action.api';
import {FretActionMock} from './fret-action.mock';

export * from './fret-action.api'

let _instance: FretActionApi;
export const getFretActionApi = () => _instance ? _instance : _instance = new FretActionMock();
