
export interface FretBoardActions {
  actions: FretBoardAction[];
}

export interface FretBoardAction {
  stringIndex: number;
  fretIndex: number;
  active: boolean;
  bend?: string;
}
