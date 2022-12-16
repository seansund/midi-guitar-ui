import {BehaviorSubject, Observable} from 'rxjs';

import {FretBoardLabelsApi} from './fret-board-labels.api';
import {defaultFretBoardMode, defaultKey, FretBoardConfigApi, getFretBoardConfigApi} from "../fret-board-config";
import {
    FretBoardConfigModel,
    FretBoardLabelModel,
    FretBoardLabelsModel,
    FretBoardModeModel,
    KeyModel
} from '../../models';

export class FretBoardLabelsMock implements FretBoardLabelsApi {

  subject: BehaviorSubject<FretBoardLabelsModel>;

  constructor() {
      const fretConfigService: FretBoardConfigApi = getFretBoardConfigApi()

      this.subject = new BehaviorSubject(buildFretLabels({mode: defaultFretBoardMode, key: defaultKey}))

      fretConfigService.config().subscribe(config => this.subject.next(buildFretLabels(config)))
  }

  fretBoardLabels(): Observable<FretBoardLabelsModel> {
    return this.subject;
  }
}

const buildFretLabels = (fretBoardConfig: FretBoardConfigModel): FretBoardLabelsModel => {
  return {
    labels: Array.from(Array(18).keys())
      .map(fretLabels(fretBoardConfig))
      .reduce((result: FretBoardLabelModel[], current: FretBoardLabelModel[]) => {
        result.push(...current)

        return result
      }, [])
  }
}

const fretLabels = (fretBoardConfig: FretBoardConfigModel) => {
    const template = getFretBoardTemplate(fretBoardConfig.mode)
    const offset = fretBoardConfig.mode.mode !== 'notes' ? determineOffset(fretBoardConfig.key) : 0

    return (fretIndex: number): FretBoardLabelModel[] => {
        return Array
            .from(Array(6).keys())
            .map(stringIndex => ({
                fretIndex,
                stringIndex,
                label: shiftNotesDown(template[stringIndex], offset)[fretIndex % 12]
            }))
    }
}

const getFretBoardTemplate = (mode: FretBoardModeModel): string[][] => {
    switch (mode.mode) {
        case 'keyboard-major':
            return majorScale
        case 'keyboard-pentatonic':
            return penatonicMajorScale
        case 'keyboard-harmonic-minor':
            return harmonicMinorScale
        case 'notes':
        default:
            return notes
    }
}

const determineOffset = (key: KeyModel): number => {
    return baseNotes.indexOf(key.key)
}

const shiftNotesUp = (notes: string[], shift: number): string[] => {
    const result: string[] = [];

    for (let i = 0; i < notes.length; i++) {
        const index = (i + shift) % notes.length;

        result.push(notes[index]);
    }

    return result;
}

const shiftNotesDown = (notes: string[], shift: number): string[] => {
    const result: string[] = [];

    for (let i = 0; i < notes.length; i++) {
        const index = (i - shift + notes.length) % notes.length;

        result.push(notes[index]);
    }

    return result;
}

const baseNotes = ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'];
const notes = [
    shiftNotesUp(baseNotes, 9),
    shiftNotesUp(baseNotes, 4),
    shiftNotesUp(baseNotes, 0),
    shiftNotesUp(baseNotes, 7),
    shiftNotesUp(baseNotes, 2),
    shiftNotesUp(baseNotes, 9),
]

const scaleKey = 'G'
const penatonicMajorScale = [
    ['x', '',  '', 'x',  '', 'x', '', 'x', '',  '', 'x', ''],
    ['x', '',  '', 'x',  '', 'x', '', '', 'x',  '', 'x', ''],
    ['x', '', 'x',  '', 'x',  '', '', 'x', '', 'x',  '', ''],
    ['x', '', 'x',  '',  '', 'x', '', 'x', '', 'x',  '', ''],
    ['x', '', 'x',  '',  '', 'x', '', 'x', '',  '', 'x', ''],
    ['x', '',  '', 'x',  '', 'x', '', 'x', '',  '', 'x', ''],
]

const majorScale = [
    ['x',  '', 'x', 'x',  '', 'x', '', 'x', 'x',  '', 'x',  ''],
    ['x', 'x',  '', 'x',  '', 'x', '', 'x', 'x',  '', 'x',  ''],
    ['x',  '', 'x',  '', 'x', 'x', '', 'x',  '', 'x',  '', 'x'],
    ['x',  '', 'x',  '', 'x', 'x', '', 'x',  '', 'x', 'x',  ''],
    ['x',  '', 'x', 'x',  '', 'x', '', 'x',  '', 'x', 'x',  ''],
    ['x',  '', 'x', 'x',  '', 'x', '', 'x', 'x',  '', 'x',  ''],
]

const harmonicMinorScale = [
    [ '',  '', 'x', 'x',  '', 'x', 'x',  '', 'x',  '', 'x', 'x'],
    [ '', 'x',  '', 'x', 'x',  '',  '', 'x', 'x',  '', 'x', 'x'],
    ['x',  '', 'x', 'x',  '', 'x',  '', 'x', 'x',  '',  '', 'x'],
    ['x', 'x',  '',  '', 'x', 'x',  '', 'x', 'x',  '', 'x',  ''],
    ['x', 'x',  '', 'x',  '', 'x', 'x',  '',  '', 'x', 'x',  ''],
    [ '',  '', 'x', 'x',  '', 'x', 'x',  '', 'x',  '', 'x', 'x'],
]
