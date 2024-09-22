import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { GameFeature } from '../reducer';
import { GameState } from '../state';
import { ResourceEnum } from '../../common/models/resource';
import { selectElementsCount, selectIsLoading, selectPlayer1, selectPlayer2, selectSelectedResource } from '../selectors';
import { Player } from '../../common/models/player';

describe('GameState selectors', () => {
  const initialState: GameState = {
    isLoading: true,
    selectedResource: ResourceEnum.Starships,
    elementsCount: 2,
    player1: {
      name: 'Player1',
      currentCard: { name: 'name1', mass: 1 },
      points: 1,
    },
    player2: {
      name: 'Player2',
      currentCard: { name: 'name2', mass: 2 },
      points: 2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ game: GameFeature.reducer })],
    }).compileComponents();
  });

  [
    { selector: selectIsLoading, result: true },
    { selector: selectSelectedResource, result: ResourceEnum.Starships },
    { selector: selectElementsCount, result: 2 },
    {
      selector: selectPlayer1,
      result: {
        name: 'Player1',
        currentCard: { name: 'name1', mass: 1 },
        points: 1,
      } as Player,
    },
    {
      selector: selectPlayer2,
      result: {
        name: 'Player2',
        currentCard: { name: 'name2', mass: 2 },
        points: 2,
      } as Player,
    },
  ].forEach((item, index) => {
    it('should project state :: ' + index, () => {
      const result = item.selector.projector(initialState);
      expect(result).toEqual(item.result);
    });
  });
});
