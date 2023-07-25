
export interface FretBoardLabelsModel {
  labels: FretBoardLabelModel[];
}

export interface FretBoardLabelModel {
  stringIndex: number;
  fretIndex: number;
  label: string;
}
