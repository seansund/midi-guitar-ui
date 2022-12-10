import {FretLabelsApi} from './fret-labels.api';
import {FretLabelsMock} from './fret-labels.mock';

export * from './fret-labels.api'

let _instance: FretLabelsApi;
export const getFretLabelsApi = () => _instance ? _instance : _instance = new FretLabelsMock();
