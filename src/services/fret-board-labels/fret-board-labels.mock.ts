import {BehaviorSubject, Observable} from 'rxjs';

import {FretBoardLabelsApi} from './fret-board-labels.api';
import {FretBoardLabelModel, FretBoardLabelsModel} from '../../models';

export class FretBoardLabelsMock implements FretBoardLabelsApi {

  subject: BehaviorSubject<FretBoardLabelsModel>;

  constructor() {
    this.subject = new BehaviorSubject(defaultFretLabels())
  }

  fretBoardLabels(): Observable<FretBoardLabelsModel> {
    return this.subject;
  }
}

const defaultFretLabels = (): FretBoardLabelsModel => {
  return {
    labels: Array.from(Array(18).keys())
      .map(fretLabels)
      .reduce((result: FretBoardLabelModel[], current: FretBoardLabelModel[]) => {
        result.push(...current)

        return result
      }, [])
  }
}

const fretLabels = (fretIndex: number): FretBoardLabelModel[] => {
  const labels = Array.from(Array(6).keys())
    .map(stringIndex => ({fretIndex, stringIndex, label: notes[stringIndex][fretIndex % 12]}))

  return labels
}

const notes = [
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
  ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
  ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
  ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
  ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']
]