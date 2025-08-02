import { createAction, props } from '@ngrx/store';
import { Trainee } from '../interfaces/trainee.interface';

export const loadTrainees = createAction('[Data] Load');
export const setTrainees = createAction('[Data] Set', props<{ trainees: Trainee[] }>());
export const setTraineesFiltered = createAction('[Data] Set Filtered', props<{ traineesFiltered: Trainee[] }>());
export const addTrainee = createAction('[Trainee] Add', props<{ trainee: Trainee }>());
export const updateTrainee = createAction('[Trainee] Update', props<{ trainee: Trainee }>());
export const deleteTrainee = createAction('[Trainee] Delete', props<{ id: number }>());
export const selectTraineeRow = createAction('[Data] Select', props<{ selectedRow: Trainee | null }>());
export const selectTrainees = createAction('[Data] Select', props<{ trainees: Trainee[] }>());
export const selectTraineesFiltered = createAction('[Data] Select Filtered', props<{ traineesFiltered: Trainee[] }>());
export const setFilter = createAction('[Data] Filter', props<{ filter: string }>());
export const setPageIndex = createAction('[Data] Set Page Index', props<{ pageIndex: number }>());
