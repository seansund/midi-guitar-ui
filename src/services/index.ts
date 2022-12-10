import {ChordApi} from './chord';
import {FretActionApi} from './fret-action';
import {FretLabelsApi} from './fret-labels';
import {FretLabelsMock} from './fret-labels/fret-labels.mock';
import {ActionChordMock} from './mock/action-chord.mock';

export * from './fret-action'
export * from './fret-labels'
export * from './chord'

let _actionInstance: FretActionApi & ChordApi;
export const getFretActionApi = () => _actionInstance ? _actionInstance : _actionInstance = new ActionChordMock();
export const getChordApi = () => _actionInstance ? _actionInstance : _actionInstance = new ActionChordMock();

let _labelInstance: FretLabelsApi;
export const getFretLabelsApi = () => _labelInstance ? _labelInstance : _labelInstance = new FretLabelsMock();
