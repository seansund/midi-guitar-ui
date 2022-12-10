import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {fretLabelsAtom} from '../atoms/fret-labels.atom';
import {FretBoardLabel, FretBoardLabels} from '../models';
import {FretLabelsApi, getFretLabelsApi} from '../services/fret-labels';

const service: FretLabelsApi = getFretLabelsApi();

export const useFretLabels = (): FretBoardLabel[] => {
  const [fretLabels, setFretLabels] = useAtom(fretLabelsAtom);

  useEffect(() => {
    const subscription = service.fretLabels().subscribe((labels: FretBoardLabels) => {
      setFretLabels(labels.labels)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return fretLabels
}