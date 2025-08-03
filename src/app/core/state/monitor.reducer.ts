import { createReducer, on } from "@ngrx/store";
import * as MonitorActions from './monitor.actions';
import { TraineeMonitor } from "../interfaces/traineeMonitor.interface";




export interface MonitorState {
    cbPassed: boolean;
    cbFailed: boolean;
    traineesFiltered: TraineeMonitor[];
    idFilter: string;
    nameFilter: string;
}
export const initialState: MonitorState = {
    cbPassed: true,
    cbFailed: true,
    traineesFiltered: [],
    idFilter: '',
    nameFilter: ''
};


export const monitorReducer = createReducer(
    initialState,
    on(MonitorActions.setPassedFilter, (state, { cbPassed }) => ({ ...state, cbPassed })),
    on(MonitorActions.setFailedFilter, (state, { cbFailed }) => ({ ...state, cbFailed })),
    on(MonitorActions.setIdFilter, (state, { idFilter }) => ({ ...state, idFilter })),
    on(MonitorActions.setNameFilter, (state, { nameFilter }) => ({ ...state, nameFilter })),
    on(MonitorActions.selectIdFilter, (state, { idFilter }) => ({ ...state, idFilter: idFilter })),
    on(MonitorActions.selectNameFilter, (state, { nameFilter }) => ({ ...state, nameFilter: nameFilter })),
    on(MonitorActions.selectPassedFilter, (state, { cbPassed }) => ({ ...state, cbPassed: cbPassed })),
    on(MonitorActions.selectFailedFilter, (state, { cbFailed }) => ({ ...state, cbFailed: cbFailed })),
    on(MonitorActions.setTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered })),
    on(MonitorActions.selectTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered: traineesFiltered })),

);  