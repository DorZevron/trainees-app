import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataState } from "./data.reducer";




export const selectDataState = createFeatureSelector<DataState>('data');

export const selectTrainees = createSelector(
    selectDataState,
    (state) => state.trainees
);

export const selectSelectedTrainee = createSelector(
    selectDataState,
    (state) => state.selectedRow
);

export const selectFilter = createSelector(
    selectDataState,
    (state) => state.filter
);


export const selectTraineesFiltered = createSelector(
    selectDataState,
    (state) => state.traineesFiltered
);

export const selectPageIndex = createSelector(
    selectDataState,
    (state) => state.pageIndex
);

