import { GameFeature } from '../reducer';
import { GameActions } from '../actions';
import { GameState, initialGameState } from '../state';
import { ResourceEnum } from '../../common/models/resource';

class SetResultContext {
  action = GameActions.setResult({ player1Card: { name: 'name1', mass: 2 }, player2Card: { name: 'name2', mass: 1 } });
  expectedState: GameState = {
    ...initialGameState,
    player1: { points: 1, name: 'Player1', currentCard: { name: 'name1', mass: 2 } },
    player2: { points: 0, name: 'Player2', currentCard: { name: 'name2', mass: 1 } },
  };
}

class InitializeContext {
  action = GameActions.initialize({ resourceType: ResourceEnum.Starships });
  expectedState: GameState = {
    ...initialGameState,
    isLoading: true,
    selectedResource: ResourceEnum.Starships,
  };
}

class FinishInitializationContext {
  action = GameActions.finishInitialization({ resourceElementsCount: 1 });
  expectedState: GameState = {
    ...initialGameState,
    elementsCount: 1,
    isLoading: true,
  };
}

class DrawCardsContext {
  action = GameActions.drawCards();
  expectedState: GameState = {
    ...initialGameState,
    isLoading: true,
  };
}

describe('GameState reducer', () => {
  [new SetResultContext(), new InitializeContext(), new FinishInitializationContext(), new DrawCardsContext()].forEach((item, index) => {
    it('should reduce action :: ' + index, () => {
      const newState = GameFeature.reducer(initialGameState, item.action);

      expect(newState).toEqual(item.expectedState);
    });
  });
});
