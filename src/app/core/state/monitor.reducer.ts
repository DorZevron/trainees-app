import { createReducer, on } from "@ngrx/store";
import * as MonitorActions from './monitor.actions';
import { TraineeMonitor } from "../interfaces/traineeMonitor.interface";




export interface MonitorState {
    cbPassed: boolean;
    cbFailed: boolean;
    traineesFiltered: TraineeMonitor[];
}
export const initialState: MonitorState = {
    cbPassed: true,
    cbFailed: true,
    traineesFiltered: []
};


export const monitorReducer = createReducer(
    initialState,
    on(MonitorActions.setPassedFilter, (state, { cbPassed }) => ({ ...state, cbPassed })),
    on(MonitorActions.setFailedFilter, (state, { cbFailed }) => ({ ...state, cbFailed })),
    on(MonitorActions.selectPassedFilter, (state, { cbPassed }) => ({ ...state, cbPassed: cbPassed })),
    on(MonitorActions.selectFailedFilter, (state, { cbFailed }) => ({ ...state, cbFailed: cbFailed })),
    on(MonitorActions.setTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered })),
    on(MonitorActions.selectTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered: traineesFiltered })),

);  