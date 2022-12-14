import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {fretBoardLabelsAtom} from '../atoms';
import {FretBoardLabelModel, FretBoardLabelsModel} from '../models';
import {FretBoardLabelsApi, getFretLabelsApi} from '../services';

const service: FretBoardLabelsApi = getFretLabelsApi();

export const useFretBoardLabels = (): FretBoardLabelModel[] => {
  const [fretLabels, setFretLabels] = useAtom(fretBoardLabelsAtom);

  useEffect(() => {
    const subscription = service.fretBoardLabels().subscribe((labels: FretBoardLabelsModel) => {
      setFretLabels(labels.labels)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return fretLabels
}