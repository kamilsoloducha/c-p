import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './state';

const selectFeature = createFeatureSelector<GameState>('game');

export const selectIsLoading = createSelector(selectFeature, (state) => state.isLoading);
export const selectSelectedResource = createSelector(selectFeature, (state) => state.selectedResource);
export const selectElementsCount = createSelector(selectFeature, (state) => state.elementsCount);
export const selectPlayer1 = createSelector(selectFeature, (state) => state.player1);
export const selectPlayer2 = createSelector(selectFeature, (state) => state.player2);
