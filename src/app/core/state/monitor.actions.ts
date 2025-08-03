import { createAction, props } from "@ngrx/store";
import { TraineeMonitor } from "../interfaces/traineeMonitor.interface";





export const setPassedFilter = createAction('[Monitor] Set PassedFilter', props<{ cbPassed: boolean }>());
export const setFailedFilter = createAction('[Monitor] Set FailedFilter', props<{ cbFailed: boolean }>());
export const setTraineesFiltered = createAction('[Monitor] Set Trainees Filtered', props<{ traineesFiltered: TraineeMonitor[] }>());
export const setIdFilter = createAction('[Monitor] Set ID Filter', props<{ idFilter: string }>());
export const setNameFilter = createAction('[Monitor] Set Name Filter', props<{ nameFilter: string }>());
export const selectIdFilter = createAction('[Monitor] Select ID Filter', props<{ idFilter: string }>());
export const selectNameFilter = createAction('[Monitor] Select Name Filter', props<{ nameFilter: string }>());
export const selectTraineesFiltered = createAction('[Monitor] Select Trainees Filtered', props<{ traineesFiltered: TraineeMonitor[] }>());
export const selectPassedFilter = createAction('[Monitor] Select PassedFilter', props<{ cbPassed: boolean }>());
export const selectFailedFilter = createAction('[Monitor] Select FailedFilter', props<{ cbFailed: boolean }>());
