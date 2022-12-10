import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {fretActionsAtom} from '../atoms/fret-actions.atom';
import {FretBoardAction, FretBoardActions} from '../models';
import {FretActionApi, getFretActionApi} from '../services';

const service: FretActionApi = getFretActionApi();

export const useFretActions = (): FretBoardAction[] => {
  const [fretActions, setFretActions] = useAtom(fretActionsAtom);

  useEffect(() => {
    const subscription = service.fretActions().subscribe((actions: FretBoardActions) => {
      setFretActions(actions.actions)
    });

    return () => {
      subscription.unsubscribe()
    }
  })

  return fretActions
}