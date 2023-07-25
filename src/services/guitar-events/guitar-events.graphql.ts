import {GuitarEventsApi} from "./guitar-events.api";
import {BehaviorSubject, Observable} from "rxjs";
import {ChordModel, ChordsModel, GuitarPositionModel, GuitarPositionsModel} from "../../models";
import {ApolloClient, FetchResult, gql} from "@apollo/client";
import {getApolloClient} from "../../backends/apollo-client";

const CHORDS_SUBSCRIPTION = gql`subscription { chords { label } }`
const GUITAR_POSITIONS_SUBSCRIPTION = gql`subscription { guitarPositions { stringIndex fretIndex active bend } }`

export class GuitarEventsGraphql implements GuitarEventsApi {
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

}