import {BehaviorSubject, interval, map, Observable} from 'rxjs';
import {ChordsModel, GuitarPositionsModel} from '../../models';
import {GuitarEventsApi} from "./guitar-events.api";

export class GuitarEventsMock implements GuitarEventsApi {
    guitarPositionsSubject: BehaviorSubject<GuitarPositionsModel>;
    chordSubject: BehaviorSubject<ChordsModel>;

    constructor() {
        const active = true

        this.guitarPositionsSubject = new BehaviorSubject<GuitarPositionsModel>({positions: []})
        this.chordSubject = new BehaviorSubject<ChordsModel>({chords: []})

        const actions: Array<ChordsModel & GuitarPositionsModel> = [
            {
                positions: [
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
                positions: [
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
                positions: [
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
                positions: [
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
                positions: [
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
                next: (next: ChordsModel & GuitarPositionsModel) => {
                    this.guitarPositionsSubject.next(next)
                    this.chordSubject.next(next)
                },
                error: (err: any) => {
                    this.guitarPositionsSubject.error(err)
                    this.chordSubject.error(err)
                },
                complete: () => {
                    this.guitarPositionsSubject.complete()
                    this.chordSubject.complete()
                }
            })
    }

    chord(): Observable<ChordsModel> {
        return this.chordSubject;
    }

    guitarPositions(): Observable<GuitarPositionsModel> {
        return this.guitarPositionsSubject;
    }

}