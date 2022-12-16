import {useEffect} from 'react';
import {useAtom} from 'jotai';

import {fretBoardModesAtom} from "../atoms";
import {FretBoardModeModel} from '../models';
import {FretBoardConfigApi, getFretBoardConfigApi} from '../services';

const service: FretBoardConfigApi = getFretBoardConfigApi();

export const useFretBoardModes = (): FretBoardModeModel[] => {
  const [modes, setFretBoardModes] = useAtom(fretBoardModesAtom);

  useEffect(() => {
    const subscription = service.getAvailableModes().subscribe(setFretBoardModes);

    return () => {
      subscription.unsubscribe()
    }
  })

  return modes
}
