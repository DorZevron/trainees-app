import { createReducer, on } from '@ngrx/store';
import * as DataActions from './data.actions';
import { Trainee } from '../interfaces/trainee.interface';

export interface DataState {
    trainee: Trainee | null;
    trainees: Trainee[];
    selectedRow: Trainee | null;
    traineesFiltered: Trainee[];
    filter: string;
    pageIndex: number;
}
export const initialState: DataState = {
    trainee: null,
    trainees: [],
    selectedRow: null,
    filter: '',
    traineesFiltered: [],
    pageIndex: 0
};

export const dataReducer = createReducer(
    initialState,
    on(DataActions.setTrainees, (state, { trainees }) => ({ ...state, trainees })),
    on(DataActions.setTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered })),
    on(DataActions.addTrainee, (state, { trainee }) => ({ ...state, trainees: [...state.trainees, trainee] })),
    on(DataActions.updateTrainee, (state, { trainee }) => ({
        ...state,
        trainees: state.trainees.map(t => t.id === trainee.id ? { ...trainee } : t)
    })),
    on(DataActions.deleteTrainee, (state, { id }) => ({
        ...state,
        trainees: state.trainees.filter(t => t.id !== id)
    })),
    on(DataActions.loadTrainees, state => ({ ...state })),
    on(DataActions.selectTraineeRow, (state, { selectedRow }) => ({ ...state, selectedRow })),
    on(DataActions.setFilter, (state, { filter }) => ({ ...state, filter })),
    on(DataActions.selectTrainees, (state, { trainees }) => ({ ...state, trainees: trainees })),
    on(DataActions.selectTraineesFiltered, (state, { traineesFiltered }) => ({ ...state, traineesFiltered: traineesFiltered })),
    on(DataActions.setPageIndex, (state, { pageIndex }) => ({ ...state, pageIndex })),
);
