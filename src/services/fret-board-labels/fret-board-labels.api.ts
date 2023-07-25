import {Observable} from 'rxjs';
import {FretBoardLabelsModel} from '../../models';

export abstract class FretBoardLabelsApi {
  abstract fretBoardLabels(): Observable<FretBoardLabelsModel>
}
