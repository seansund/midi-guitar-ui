import {ApolloClient, FetchResult, gql} from "@apollo/client";
import {BehaviorSubject, Observable} from "rxjs";

import {FretBoardLabelsApi} from "./fret-board-labels.api";
import {getApolloClient} from "../../backends/apollo-client";
import {FretBoardLabelModel, FretBoardLabelsModel} from "../../models";

const FRET_BOARD_LABELS_SUBSCRIPTION = gql`subscription { fretBoardLabels { stringIndex fretIndex label } }`

export class FretBoardLabelsGraphql implements FretBoardLabelsApi {
    client: ApolloClient<any>
    labelSubject: BehaviorSubject<FretBoardLabelsModel>

    constructor() {
        this.client = getApolloClient()

        this.labelSubject = new BehaviorSubject<FretBoardLabelsModel>({
            labels: []
        })
    }

    fretBoardLabels(skipQuery: boolean = false): Observable<FretBoardLabelsModel> {
        if (skipQuery) {
            return this.labelSubject
        }

        this.client
            .subscribe<{fretBoardLabels: FretBoardLabelModel[]}>({
                query: FRET_BOARD_LABELS_SUBSCRIPTION
            })
            .map((config: FetchResult<{fretBoardLabels: FretBoardLabelModel[]}>) => ({labels: config.data?.fretBoardLabels || []}))
            .subscribe(this.labelSubject)

        return this.labelSubject;
    }
}
