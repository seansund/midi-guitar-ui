import {BehaviorSubject, interval, map, Observable} from 'rxjs';

import {ChordApi} from '../chord';
import {FretActionApi} from '../fret-action';
import {Chords, FretBoardActions} from '../../models';

export class ActionChordMock implements FretActionApi, ChordApi {
  actionSubject: BehaviorSubject<FretBoardActions>;
  chordSubject: BehaviorSubject<Chords>;

  constructor() {
    const active = true

    this.actionSubject = new BehaviorSubject<FretBoardActions>({actions: []})
    this.chordSubject = new BehaviorSubject<Chords>({chords: []})

    const actions: Array<Chords & FretBoardActions> = [
      {
        actions: [
          {stringIndex: 0, fretIndex: 0, active},
          {stringIndex: 1, fretIndex: 1, active},
          {stringIndex: 2, fretIndex: 0, active},
          {stringIndex: 3, fretIndex: 2, active},
          {stringIndex: 4, fretIndex: 3, active},
        ],
        chords: [
          {label: 'C'}
        ]
      },
      {
        actions: [
          {stringIndex: 0, fretIndex: 3, active},
          {stringIndex: 1, fretIndex: 3, active},
          {stringIndex: 2, fretIndex: 0, active},
          {stringIndex: 3, fretIndex: 0, active},
          {stringIndex: 4, fretIndex: 2, active},
          {stringIndex: 5, fretIndex: 3, active},
        ],
        chords: [
          {label: 'G'}
        ]
      },
      {
        actions: [
          {stringIndex: 0, fretIndex: 2, active},
          {stringIndex: 1, fretIndex: 3, active},
          {stringIndex: 2, fretIndex: 2, active},
          {stringIndex: 3, fretIndex: 0, active},
        ],
        chords: [
          {label: 'D'}
        ]
      },
      {
        actions: [
          {stringIndex: 0, fretIndex: 0, active},
          {stringIndex: 1, fretIndex: 1, active},
          {stringIndex: 2, fretIndex: 2, active},
          {stringIndex: 3, fretIndex: 2, active},
          {stringIndex: 4, fretIndex: 0, active},
        ],
        chords: [
          {label: 'Am'}
        ]
      },
      {
        actions: [
          {stringIndex: 0, fretIndex: 0, active},
          {stringIndex: 1, fretIndex: 0, active},
          {stringIndex: 2, fretIndex: 0, active},
          {stringIndex: 3, fretIndex: 2, active},
          {stringIndex: 4, fretIndex: 2, active},
          {stringIndex: 5, fretIndex: 0, active},
        ],
        chords: [
          {label: 'Em'}
        ]
      },
    ]

    interval(5000).pipe(map(i => actions[i % actions.length]))
      .subscribe({
        next: (next: Chords & FretBoardActions) => {
          this.actionSubject.next(next)
          this.chordSubject.next(next)
        },
        error: (err: any) => {
          this.actionSubject.error(err)
          this.chordSubject.error(err)
        },
        complete: () => {
          this.actionSubject.complete()
          this.chordSubject.complete()
        }
      })
  }

  chord(): Observable<Chords> {
    return this.chordSubject;
  }

  fretActions(): Observable<FretBoardActions> {
    return this.actionSubject;
  }

}