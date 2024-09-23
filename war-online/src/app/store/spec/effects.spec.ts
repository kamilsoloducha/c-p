import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { GameEffects } from '../effects';
import { CardProvider } from '../../services/card-provider/card.provider';
import { ResourceElementsCountProvider, ResourceElementsCountProviderResolver } from '../../services/elements-count/elements-count.provider';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { GameActions } from '../actions';
import { Resource, ResourceEnum } from '../../common/models/resource';
import { cold, hot } from 'jasmine-marbles';
import { selectElementsCount, selectSelectedResource } from '../selectors';

describe('GameState effects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let cardProvider: jasmine.SpyObj<CardProvider>;
  let countProviderResolver: jasmine.SpyObj<ResourceElementsCountProviderResolver>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        GameEffects,
        { provide: CardProvider, useValue: jasmine.createSpyObj('cardProvider', ['getRandomCard']) },
        { provide: ResourceElementsCountProviderResolver, useValue: jasmine.createSpyObj('countProvider', ['getProvider']) },
      ],
    }).compileComponents();

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(GameEffects);
    cardProvider = TestBed.inject(CardProvider) as jasmine.SpyObj<CardProvider>;
    countProviderResolver = TestBed.inject(ResourceElementsCountProviderResolver) as jasmine.SpyObj<ResourceElementsCountProviderResolver>;
    store = TestBed.inject(MockStore);
  });

  it('should handle initialize action', () => {
    const countProvider = jasmine.createSpyObj<ResourceElementsCountProvider>('countprovider', ['getCount']);
    countProvider.getCount.and.returnValue(of(10));
    countProviderResolver.getProvider.withArgs(ResourceEnum.Starships).and.returnValue(countProvider);

    const inputAction = GameActions.initialize({ resourceType: ResourceEnum.Starships });
    actions$ = hot('a', { a: inputAction });

    const expectAction = cold('(a)', { a: GameActions.finishInitialization({ resourceElementsCount: 10 }) });

    expect(effects.initialize$).toBeObservable(expectAction);
  });

  it('should handle finishInitialization', () => {
    store.overrideSelector(selectSelectedResource, ResourceEnum.People);
    store.overrideSelector(selectElementsCount, 20);
    store.refreshState();
    cardProvider.getRandomCard.withArgs(20, ResourceEnum.People).and.returnValue(of<Resource>({ name: 'name', mass: 5 } as Resource));

    const inputAction = GameActions.finishInitialization({ resourceElementsCount: 20 });
    actions$ = hot('a', { a: inputAction });

    const expectAction = cold('(a)', { a: GameActions.setResult({ player1Card: { name: 'name', mass: 5 } as Resource, player2Card: { name: 'name', mass: 5 } as Resource }) });

    expect(effects.getRandom$).toBeObservable(expectAction);
  });

  it('should handle drawCards', () => {
    store.overrideSelector(selectSelectedResource, ResourceEnum.People);
    store.overrideSelector(selectElementsCount, 20);
    store.refreshState();
    cardProvider.getRandomCard.withArgs(20, ResourceEnum.People).and.returnValue(of<Resource>({ name: 'name', mass: 5 } as Resource));

    const inputAction = GameActions.drawCards();
    actions$ = hot('a', { a: inputAction });

    const expectAction = cold('(a)', { a: GameActions.setResult({ player1Card: { name: 'name', mass: 5 } as Resource, player2Card: { name: 'name', mass: 5 } as Resource }) });

    expect(effects.getRandom$).toBeObservable(expectAction);
  });
});
