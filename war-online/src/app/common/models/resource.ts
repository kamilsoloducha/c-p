import { Attribute } from './attribute';

export enum ResourceEnum {
  People,
  Starships,
}

export type Starship = {
  name: string;
  crew: number;
};

export type Person = {
  mass: number;
  name: string;
};

export type Resource = Starship | Person;
