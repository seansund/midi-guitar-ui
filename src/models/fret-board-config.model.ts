
export interface FretBoardConfigModel {
    mode: FretBoardModeModel;
    key: KeyModel;
}

export interface FretBoardModeModel {
    mode: string;
    label: string;
}

export interface KeyModel {
    key: string;
    label: string;
}
