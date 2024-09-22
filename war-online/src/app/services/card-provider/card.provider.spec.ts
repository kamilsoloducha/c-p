import { TestBed } from '@angular/core/testing';
import { SwapiHttpService } from '../swapi-http/swapi-http.service';
import { CardProvider } from './card.provider';
import { Person, ResourceEnum } from '../../common/models/resource';
import { of } from 'rxjs';
import { PersonDto } from '../../common/dtos/person.dto';
import { cold } from 'jasmine-marbles';
import { StarshipDto } from '../../common/dtos/starship.dto';

describe('CardProvider', () => {
  let cardProvider: CardProvider;
  let swapiClientMock: jasmine.SpyObj<SwapiHttpService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardProvider, { provide: SwapiHttpService, useValue: jasmine.createSpyObj('swapiClient', ['getOrderedPerson', 'getOrderedStarship']) }],
    }).compileComponents();

    cardProvider = TestBed.inject(CardProvider);
    swapiClientMock = TestBed.inject(SwapiHttpService) as jasmine.SpyObj<SwapiHttpService>;
  });

  it('should return Person', () => {
    swapiClientMock.getOrderedPerson.and.returnValue(
      of<PersonDto>({
        result: {
          properties: {
            mass: '2',
            name: 'name',
          },
        },
      } as PersonDto),
    );

    const result = cardProvider.getRandomCard(20, ResourceEnum.People);

    expect(result).toBeObservable(cold('(a|)', { a: { name: 'name', mass: 2 } }));
    expect(swapiClientMock.getOrderedPerson).toHaveBeenCalledTimes(1);
  });

  it('should return Starship', () => {
    swapiClientMock.getOrderedStarship.and.returnValue(
      of<StarshipDto>({
        result: {
          properties: {
            crew: '2',
            name: 'name',
          },
        },
      } as StarshipDto),
    );

    const result = cardProvider.getRandomCard(20, ResourceEnum.Starships);

    expect(result).toBeObservable(cold('(a|)', { a: { name: 'name', crew: 2 } }));
    expect(swapiClientMock.getOrderedStarship).toHaveBeenCalledTimes(1);
  });
});
