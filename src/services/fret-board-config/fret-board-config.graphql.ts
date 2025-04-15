import {BehaviorSubject, defer, from, Observable} from "rxjs";
import {ApolloClient, FetchResult, gql} from '@apollo/client';

import {defaultFretBoardMode, defaultKey, FretBoardConfigApi} from "./fret-board-config.api";
import {getApolloClient} from "@/backends/apollo-client";
import {FretBoardConfigModel, FretBoardModeModel, KeyModel} from "@/models";

const GET_GUITAR_KEYS = gql`query { getAvailableKeys { key label } }`;

const GET_FRET_BOARD_MODES = gql`query { getAvailableModes { mode label } }`;

const MUTATE_GUITAR_KEY = gql`
mutation UpdateGuitarKey($key: String!) {
  updateGuitarKey(key: $key) {
    key
    mode
  }
}
`

const MUTATE_FRET_BOARD_MODE = gql`
mutation UpdateFretBoardMode($mode: String!) {
  updateFretBoardMode(mode: $mode) {
    key
    mode
  }
}
`

const FRET_BOARD_CONFIG_SUBSCRIPTION = gql`subscription { fretBoardConfig { key mode } }`

export class FretBoardConfigGraphql implements FretBoardConfigApi {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: ApolloClient<any>

    configSubject: BehaviorSubject<FretBoardConfigModel>

    constructor() {
        this.client = getApolloClient()

        this.configSubject = new BehaviorSubject<FretBoardConfigModel>({
            key: defaultKey.key,
            mode: defaultFretBoardMode.mode
        })
    }

    config(skipQuery: boolean = false): Observable<FretBoardConfigModel> {
        if (skipQuery) {
            return this.configSubject
        }

        this.client
            .subscribe<{fretBoardConfig: FretBoardConfigModel}>({
                query: FRET_BOARD_CONFIG_SUBSCRIPTION
            })
            .map((config: FetchResult<{fretBoardConfig: FretBoardConfigModel}>) => config.data?.fretBoardConfig)
            .subscribe({
                next: (val: FretBoardConfigModel) => {
                    this.configSubject.next(val)
                },
                complete: () => {
                    console.log('Complete subscription!!!!')
                },
                error: err => {
                    console.log('Error with subscription', err)
                    this.configSubject.error(err)
                }
            })

        return this.configSubject;
    }

    getAvailableKeys(): Observable<KeyModel[]> {
        return from(
            this.client
                .query<{getAvailableKeys: KeyModel[]}>({query: GET_GUITAR_KEYS})
                .then(result => result.data.getAvailableKeys)
                .catch(err => {
                    console.log('Error getting available keys: ', err)
                    return err;
                })
        )
    }

    getAvailableModes(): Observable<FretBoardModeModel[]> {
        return from(
            this.client
                .query<{getAvailableModes: FretBoardModeModel[]}>({query: GET_FRET_BOARD_MODES})
                .then(result => result.data.getAvailableModes)
                .catch(err => {
                    console.log('Error getting available modes: ', err)
                    return err;
                })
        )
    }

    setKey(key: string): Observable<FretBoardConfigModel> {
        console.log('Setting key: ' + key)

        return defer(() => this.client
            .mutate<{updateGuitarKey: FretBoardConfigModel}>({
                mutation: MUTATE_GUITAR_KEY,
                variables: {key}
            })
            .then<FretBoardConfigModel>((result: FetchResult<{updateGuitarKey: FretBoardConfigModel}>) => {
                if (result.data) {
                    const config = result.data.updateGuitarKey

                    this.configSubject.next(config)

                    return config;
                }
                return this.configSubject.getValue()
            })
        )
    }

    setMode(mode: string): Observable<FretBoardConfigModel> {
        return defer(() => this.client
            .mutate<{updateFretBoardMode: FretBoardConfigModel}>({
                mutation: MUTATE_FRET_BOARD_MODE,
                variables: {mode}
            })
            .then((result: FetchResult<{updateFretBoardMode: FretBoardConfigModel}>) => {
                if (result.data) {
                    const config = result.data.updateFretBoardMode

                    this.configSubject.next(config)

                    return config
                }
                return this.configSubject.getValue()
            })
            .catch(err => {
                console.log('Error: ', err)
                throw err
            })
        )
    }
}