import { Person, Starship } from '../../common/models/resource';
import { compareCards } from './card-comparer';

describe('CardComparer', () => {
  [
    {
      resource1: { mass: 1 } as Person,
      resource2: { mass: 1 } as Person,
      result: 0,
    },
    {
      resource1: { crew: 1 } as Starship,
      resource2: { crew: 1 } as Starship,
      result: 0,
    },
    {
      resource1: { crew: 2 } as Starship,
      resource2: { crew: 1 } as Starship,
      result: 1,
    },
    {
      resource1: { crew: 0 } as Starship,
      resource2: { crew: 1 } as Starship,
      result: 2,
    },
    {
      resource1: { crew: Number.NaN } as Starship,
      resource2: { crew: 1 } as Starship,
      result: 2,
    },
    {
      resource1: { crew: 1 } as Starship,
      resource2: { crew: Number.NaN } as Starship,
      result: 1,
    },
    {
      resource1: { crew: Number.NaN } as Starship,
      resource2: { crew: Number.NaN } as Starship,
      result: 0,
    },
  ].forEach((item, index) => {
    it('should compare cards accordingly :: ' + index, () => {
      var result = compareCards(item.resource1, item.resource2);
      expect(result).toBe(item.result);
    });
  });
});
