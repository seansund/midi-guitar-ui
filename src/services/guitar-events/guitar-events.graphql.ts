import {BehaviorSubject, Observable} from "rxjs";
import {ApolloClient, FetchResult, gql} from "@apollo/client";

import {GuitarEventsApi} from "./guitar-events.api";
import {getApolloClient} from "@/backends/apollo-client";
import {ChordModel, ChordsModel, GuitarPositionModel, GuitarPositionsModel} from "@/models";

const CHORDS_SUBSCRIPTION = gql`subscription { chords { label } }`
const GUITAR_POSITIONS_SUBSCRIPTION = gql`subscription { guitarPositions { stringIndex fretIndex active bend } }`
const PRESS_NOTE_MUTATION = gql`mutation PressNote($stringIndex: Int!, $fretIndex: Int!) { pressNote(stringIndex: $stringIndex, fretIndex: $fretIndex) {
    stringIndex
    fretIndex
    active
} }`


export class GuitarEventsGraphql implements GuitarEventsApi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: ApolloClient<any>
    chordSubject: BehaviorSubject<ChordsModel>
    guitarPositionsSubject: BehaviorSubject<GuitarPositionsModel>

    constructor() {
        this.client = getApolloClient()

        this.chordSubject = new BehaviorSubject<ChordsModel>({
            chords: []
        })

        this.guitarPositionsSubject = new BehaviorSubject<GuitarPositionsModel>({
            positions: []
        })
    }

    chord(skipQuery: boolean = false): Observable<ChordsModel> {
        if (skipQuery) {
            return this.chordSubject
        }

        console.log('Subscribing to chord events');
        this.client
            .subscribe<{chords: ChordModel[]}>({
                query: CHORDS_SUBSCRIPTION
            })
            .map((config: FetchResult<{chords: ChordModel[]}>) => {
                return {chords: config.data?.chords || []}
            })
            .subscribe(this.chordSubject)

        return this.chordSubject;
    }

    guitarPositions(skipQuery: boolean = false): Observable<GuitarPositionsModel> {
        if (skipQuery) {
            return this.guitarPositionsSubject
        }

        console.log('Subscribing to guitar events')
        this.client
            .subscribe<{guitarPositions: GuitarPositionModel[]}>({
                query: GUITAR_POSITIONS_SUBSCRIPTION
            })
            .map((config: FetchResult<{guitarPositions: GuitarPositionModel[]}>) => {
                return {positions: config.data?.guitarPositions || []}
            })
            .subscribe(this.guitarPositionsSubject)

        return this.guitarPositionsSubject;
    }

    async pressNote(variables: {stringIndex: number, fretIndex: number}): Promise<GuitarPositionModel[]> {
        console.log(`Pressing note: $stringIndex, $fretIndex`)

        return this.client
            .mutate<{pressNote: GuitarPositionModel[]}>({
                mutation: PRESS_NOTE_MUTATION,
                variables,
            })
            .then<GuitarPositionModel[]>((result: FetchResult<{pressNote: GuitarPositionModel[]}>) => {
                if (result.data) {
                    return result.data.pressNote
                }

                return []
            })
    }
}