import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {guitarPositionsAtom} from '../atoms';
import {GuitarPositionModel, GuitarPositionsModel} from '../models';
import {getGuitarEventsApi, GuitarEventsApi} from "../services";

const service: GuitarEventsApi = getGuitarEventsApi();

export const useGuitarPositions = (): GuitarPositionModel[] => {
  const [guitarPositions, setGuitarPositions] = useAtom(guitarPositionsAtom);

  useEffect(() => {
    const subscription = service.guitarPositions().subscribe((actions: GuitarPositionsModel) => {
      setGuitarPositions(actions.positions)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return guitarPositions
}