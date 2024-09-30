import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { GameBoardComponent } from './game-board.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { PointsCounterComponent } from '../points-counter/points-counter.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { selectPlayer1, selectPlayer2 } from '../../store/selectors';
import { By } from '@angular/platform-browser';
import { GameActions } from '../../store/actions';
import { MemoizedSelector } from '@ngrx/store';
import { GameState } from '../../store/state';
import { Player } from '../../common/models/player';
import { of } from 'rxjs';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let mockStore: MockStore;
  let player1Selector: MemoizedSelector<GameState, Player>;
  let player2Selector: MemoizedSelector<GameState, Player>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent, MockComponents(PointsCounterComponent, GameCardComponent)],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  describe('when cards are set', () => {
    beforeEach(() => {
      player1Selector = mockStore.overrideSelector(selectPlayer1, { name: 'Player1', points: 1, currentCard: { name: 'name', mass: 1 } });
      player2Selector = mockStore.overrideSelector(selectPlayer2, { name: 'Player2', points: 2, currentCard: { name: 'name', mass: 1 } });

      mockStore.refreshState();
    });

    it('should create', () => {
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should create results$', () => {
      fixture.detectChanges();
      expect(component.results$).toBeObservable(
        cold('a', {
          a: [
            { counter: 1, playerName: 'Player1' },
            { counter: 2, playerName: 'Player2' },
          ],
        }),
      );
    });

    it('should dispatch drawCards action after nextBattle button click', () => {
      component.isNextBattleButtonVisible$ = of(true);
      fixture.detectChanges();
      spyOn(mockStore, 'dispatch');

      const nextBattleButton = fixture.debugElement.query(By.css('button'));
      nextBattleButton.nativeElement.click();

      fixture.detectChanges();

      expect(mockStore.dispatch).toHaveBeenCalledWith(GameActions.drawCards());
    });

    it('should render players name', () => {
      component.results$ = of([
        { counter: 1, playerName: 'Player1' },
        { counter: 2, playerName: 'Player2' },
      ]);
      fixture.detectChanges();

      const firstPlayer = fixture.debugElement.query(By.css('.game-card-item'));
      const h4El = firstPlayer.query(By.css('h4'));

      expect(h4El.nativeElement.innerHTML).toBe('Player1');
    });

    it('should render PointCounter', () => {
      component.results$ = of([
        { counter: 1, playerName: 'Player1' },
        { counter: 2, playerName: 'Player2' },
      ]);
      fixture.detectChanges();
      const pointsCounterEl = fixture.debugElement.query(By.css('app-points-counter'));

      expect(pointsCounterEl).toBeTruthy();
    });

    it('should render next battle button', () => {
      component.isNextBattleButtonVisible$ = of(true);
      fixture.detectChanges();
      const nextBattleButton = fixture.debugElement.query(By.css('button'));

      expect(nextBattleButton).toBeTruthy();
    });

    it('should display GameCard componennts', () => {
      component.cards$ = of([
        { playerName: 'Player1', attributeName: 'Mass', cardName: 'name', value: 1 },
        { playerName: 'Player2', attributeName: 'Mass', cardName: 'name', value: 1 },
      ]);
      fixture.detectChanges();
      const gameCardComponents = fixture.debugElement.queryAll(By.css('app-game-card'));

      expect(gameCardComponents.length).toBe(2);
    });

    it('shoule set cards$', () => {
      expect(component.cards$).toBeObservable(
        cold('a', {
          a: [
            { playerName: 'Player1', attributeName: 'Mass', cardName: 'name', value: 1 },
            { playerName: 'Player2', attributeName: 'Mass', cardName: 'name', value: 1 },
          ],
        }),
      );
    });
  });
});
