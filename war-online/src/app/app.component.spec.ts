import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { ResourceSelectorComponent } from './components/resource-selector/resource-selector.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent, MockComponents(ResourceSelectorComponent, GameBoardComponent)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'war-online'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('war-online');
  });

  it('should render ResourceSelector', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const element = fixture.debugElement.query(By.css('app-resource-selector'));

    expect(element).toBeTruthy();
  });

  it('should render GameBoard', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const element = fixture.debugElement.query(By.css('app-game-board'));

    expect(element).toBeTruthy();
  });
});
