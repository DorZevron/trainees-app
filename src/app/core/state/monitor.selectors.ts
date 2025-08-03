import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MonitorState } from "./monitor.reducer";


export const selectMonitorState = createFeatureSelector<MonitorState>('monitor');


export const selectCbPassed = createSelector(
    selectMonitorState,
    (state) => state.cbPassed
);


export const selectCbFailed = createSelector(
    selectMonitorState,
    (state) => state.cbFailed
);


export const selectTraineesFiltered = createSelector(
    selectMonitorState,
    (state) => state.traineesFiltered
);

export const selectIdFilter = createSelector(
    selectMonitorState,
    (state) => state.idFilter
);

export const selectNameFilter = createSelector(
    selectMonitorState,
    (state) => state.nameFilter
);
