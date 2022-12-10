import {Observable} from 'rxjs';
import {FretBoardActions} from '../../models';

export abstract class FretActionApi {
  abstract fretActions(): Observable<FretBoardActions>;
}
