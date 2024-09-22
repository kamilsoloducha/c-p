import { Player } from '../common/models/player';
import { ResourceEnum } from '../common/models/resource';

export type GameState = {
  isLoading: boolean;

  selectedResource: ResourceEnum | undefined;
  elementsCount: number | undefined;

  player1: Player;
  player2: Player;
};

export const initialGameState: GameState = {
  isLoading: false,

  selectedResource: undefined,
  elementsCount: undefined,

  player1: { name: 'Player1', points: 0, currentCard: undefined },
  player2: { name: 'Player2', points: 0, currentCard: undefined },
};
