import { createFeature, createReducer, on } from '@ngrx/store';
import { GameActions } from './actions';
import { initialGameState } from './state';
import { compareCards } from '../services/card-comparer/card-comparer';

export const GameFeature = createFeature({
  name: 'name',
  reducer: createReducer(
    initialGameState,
    on(GameActions.initialize, (state, action) => {
      return {
        ...state,
        isLoading: true,
        selectedResource: action.resourceType,
      };
    }),
    on(GameActions.finishInitialization, (state, action) => {
      return {
        ...state,
        isLoading: false,
        elementsCount: action.resourceElementsCount,
      };
    }),
    on(GameActions.setResult, (state, action) => {
      const result = compareCards(action.player1Card, action.player2Card);
      const player1Points = result === 1 ? state.player1.points + 1 : state.player1.points;
      const player2Points = result === 2 ? state.player2.points + 1 : state.player2.points;
      return {
        ...state,
        isLoading: false,
        player1: { ...state.player1, currentCard: action.player1Card, points: player1Points },
        player2: { ...state.player2, currentCard: action.player2Card, points: player2Points },
      };
    }),
    on(GameActions.drawCards, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
  ),
});
