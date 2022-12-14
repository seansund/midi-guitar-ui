
export interface GuitarPositionsModel {
  positions: GuitarPositionModel[];
}

export interface GuitarPositionModel {
  stringIndex: number;
  fretIndex: number;
  active: boolean;
  bend?: string;
}
