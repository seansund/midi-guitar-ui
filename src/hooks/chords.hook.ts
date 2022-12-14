import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {chordsAtom} from '../atoms';
import {ChordModel, ChordsModel} from '../models';
import {getGuitarEventsApi, GuitarEventsApi} from "../services";

const service: GuitarEventsApi = getGuitarEventsApi();

export const useChords = (): ChordModel[] => {
  const [chords, setChords] = useAtom(chordsAtom);

  useEffect(() => {
    const subscription = service.chord().subscribe((actions: ChordsModel) => {
      setChords(actions.chords)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return chords
}