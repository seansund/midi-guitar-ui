import {BehaviorSubject, Observable} from 'rxjs';

import {FretActionApi} from './fret-action.api';
import {FretBoardActions} from '../../models';

export class FretActionMock implements FretActionApi {
  subject: BehaviorSubject<FretBoardActions>;

  constructor() {
    const active = true

    this.subject = new BehaviorSubject<FretBoardActions>({
      actions: [
        {stringIndex: 0, fretIndex: 0, active},
        {stringIndex: 1, fretIndex: 1, active},
        {stringIndex: 2, fretIndex: 0, active},
        {stringIndex: 3, fretIndex: 2, active},
        {stringIndex: 4, fretIndex: 3, active},
      ]
    })
  }

  fretActions(): Observable<FretBoardActions> {
    return this.subject;
  }

}