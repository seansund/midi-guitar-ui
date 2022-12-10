import {Observable} from 'rxjs';
import {FretBoardLabels} from '../../models';

export abstract class FretLabelsApi {
  abstract fretLabels(): Observable<FretBoardLabels>
}
