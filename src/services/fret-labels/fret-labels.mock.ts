import {BehaviorSubject, Observable} from 'rxjs';

import {FretLabelsApi} from './fret-labels.api';
import {FretBoardLabel, FretBoardLabels} from '../../models';

export class FretLabelsMock implements FretLabelsApi {

  subject: BehaviorSubject<FretBoardLabels>;

  constructor() {
    this.subject = new BehaviorSubject(defaultFretLabels())
  }

  fretLabels(): Observable<FretBoardLabels> {
    return this.subject;
  }
}

const defaultFretLabels = (): FretBoardLabels => {
  return {
    labels: Array.from(Array(18).keys())
      .map(fretLabels)
      .reduce((result: FretBoardLabel[], current: FretBoardLabel[]) => {
        result.push(...current)

        return result
      }, [])
  }
}

const fretLabels = (fretIndex: number): FretBoardLabel[] => {
  const labels = Array.from(Array(6).keys())
    .map(stringIndex => ({fretIndex, stringIndex, label: '' + fretIndex}))

  return labels
}
