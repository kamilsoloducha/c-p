import { Resource } from './resource';

export type Player = {
  name: 'Player1' | 'Player2';
  currentCard: Resource | undefined;
  points: number;
};
