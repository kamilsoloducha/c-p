import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameActions } from './actions';
import { catchError, exhaustMap, forkJoin, map, switchMap, tap, withLatestFrom, EMPTY } from 'rxjs';
import { ResourceElementsCountProviderResolver } from '../services/elements-count/elements-count.provider';
import { GameState } from './state';
import { Store } from '@ngrx/store';
import { selectElementsCount, selectSelectedResource } from './selectors';
import { CardProvider } from '../services/card-provider/card.provider';

@Injectable()
export class GameEffects {
  private readonly actions$ = inject(Actions);
  private readonly countProviderResolver = inject(ResourceElementsCountProviderResolver);
  private readonly store = inject(Store<GameState>);
  private readonly cardProvider = inject(CardProvider);

  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.initialize),
      map((action) => this.countProviderResolver.getProvider(action.resourceType)),
      switchMap((countProvider) => countProvider.getCount()),
      map((resourceCount) =>
        GameActions.finishInitialization({
          resourceElementsCount: resourceCount,
        }),
      ),
      catchError((_) => {
        alert('Error has occured. Please refresh the page');
        return EMPTY;
      }),
    ),
  );

  getRandom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.finishInitialization, GameActions.drawCards),
      withLatestFrom(this.store.select(selectSelectedResource), this.store.select(selectElementsCount)),
      exhaustMap(([_, resource, count]) => {
        return forkJoin([this.cardProvider.getRandomCard(count!, resource!), this.cardProvider.getRandomCard(count!, resource!)]);
      }),
      map(([player1, player2]) => GameActions.setResult({ player1Card: player1, player2Card: player2 })),
      catchError((_) => {
        alert('Error has occured. Please refresh the page');
        return EMPTY;
      }),
    ),
  );
}
