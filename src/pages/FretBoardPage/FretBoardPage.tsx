import React from "react";

import {FretBoardConfigModel, FretBoardModeModel, KeyModel} from "../../models";
import {useFretBoardConfig, useFretBoardModes, useGuitarKeys} from "../../hooks";
import {FretBoardDirectionToggle} from "../../components/FretBoardDirectionToggle";
import {FretBoardView} from "../../components/FretBoardView";
import {ChordView} from "../../components/ChordView/ChordView";
import {ModeControl} from "../../components/ModeControl/ModeControl";
import {GuitarKeyControl} from "../../components/GuitarKeyControl/GuitarKeyControl";
import {Grid} from "@mui/material";

export interface FretBoardPageProps {}

export const FretBoardPage = (props: FretBoardPageProps) => {
    const config: FretBoardConfigModel = useFretBoardConfig('fret-board-page')

    const modes: FretBoardModeModel[] = useFretBoardModes()
    const keys: KeyModel[] = useGuitarKeys()

    return (
        <div style={{padding: '10px'}}>
            <Grid container columns={{ xs: 3 }} alignItems="center" style={{paddingBottom: '10px'}}>
                <Grid item xs={1}>
                    <ModeControl mode={config.mode} modes={modes}></ModeControl>
                </Grid>
                <Grid item xs={1}>
                    <FretBoardDirectionToggle></FretBoardDirectionToggle>
                </Grid>
                <Grid item xs={1}>
                    <GuitarKeyControl guitarKey={config.key} guitarKeys={keys} disabled={config.mode.mode === 'notes'}></GuitarKeyControl>
                </Grid>
            </Grid>
            <FretBoardView></FretBoardView>
            <ChordView></ChordView>
        </div>
    )
}