import {BehaviorSubject, Observable} from "rxjs";
import {ApolloClient, FetchResult, gql} from "@apollo/client";

import {KeyPressedApi} from "./key-pressed.api";
import {getApolloClient} from "../../backends/apollo-client";

const KEYS_PRESSED_SUBSCRIPTION = gql`subscription { keyPressed }`

export class KeyPressedGraphql implements KeyPressedApi {

    client: ApolloClient<any>
    subject: BehaviorSubject<string>

    constructor() {
        this.client = getApolloClient()

        this.subject = new BehaviorSubject<string>('')
    }

    getKeyBuffer(): string {
        return this.subject.getValue();
    }

    keyBuffer(skipQuery: boolean = false): Observable<string> {
        if (skipQuery) {
            return this.subject
        }

        console.log('Subscribing to key pressed events')
        this.client
            .subscribe<{keyPressed: string}>({
                query: KEYS_PRESSED_SUBSCRIPTION
            })
            .map((config: FetchResult<{keyPressed: string}>) => {
                return config.data?.keyPressed || ''
            })
            .map((next: string) => {
                const current = this.subject.getValue()

                if (next === 'RETURN') {
                    return current + '\n'
                } else if (next === 'BKSP' && current.length > 0) {
                    return current.slice(0, current.length - 1)
                } else if (next !== 'BKSP' && next !== '') {
                    return current + next
                }

                return current
            })
            .subscribe({
                next: (next: string) => {
                    const current = this.subject.getValue()

                    if (next !== current) {
                        this.subject.next(next)
                    }
                },
                error: error => {
                    console.error('Error subscribing to key events', {error})
                    this.subject.error(error)
                },
                complete: () => {
                    console.log('Key event subscription is complete')
                    this.subject.complete()
                },
            })


        return this.subject;
    }

}