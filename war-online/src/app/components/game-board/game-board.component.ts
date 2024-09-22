import { Component, inject } from '@angular/core';
import { GameState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectPlayer1, selectPlayer2 } from '../../store/selectors';
import { combineLatest, map, Observable } from 'rxjs';
import { Result } from '../../common/models/results';
import { CardInfo } from '../../common/models/card-info';
import { GameActions } from '../../store/actions';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  private readonly store = inject(Store<GameState>);

  private players$ = combineLatest([this.store.select(selectPlayer1), this.store.select(selectPlayer2)]);

  results$: Observable<Result[]> = this.players$.pipe(
    map((players) => {
      return players.map((player) => {
        return { counter: player.points, playerName: player.name };
      });
    }),
  );

  cards$: Observable<CardInfo[]> = this.players$.pipe(
    map((players) => {
      return players
        .filter((player) => player.currentCard !== undefined)
        .map((player) => {
          const cardInfo: CardInfo = {
            playerName: player.name,
            attributeName: 'mass' in player.currentCard! ? 'Mass' : 'Crew',
            cardName: player.currentCard!.name,
            value: 'mass' in player.currentCard! ? player.currentCard.mass : player.currentCard!.crew,
          };
          return cardInfo;
        });
    }),
  );

  isNextBattleButtonVisible$: Observable<boolean> = this.players$.pipe(
    map((players) => {
      return players.find((player) => player.currentCard !== undefined) !== undefined;
    }),
  );

  nextBattle(): void {
    this.store.dispatch(GameActions.drawCards());
  }
}
