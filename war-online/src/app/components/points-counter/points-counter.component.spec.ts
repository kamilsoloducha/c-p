import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointsCounterComponent } from './points-counter.component';
import { Result } from '../../common/models/results';
import { By } from '@angular/platform-browser';

describe('PointsCounterComponent', () => {
  let component: PointsCounterComponent;
  let fixture: ComponentFixture<PointsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PointsCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PointsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render results', () => {
    const results: Result[] = [
      { playerName: 'Player1', counter: 10 },
      { playerName: 'Player2', counter: 20 },
    ];

    component.results = results;
    fixture.detectChanges();

    const names = fixture.debugElement.queryAll(By.css('b'));
    expect(names.length).toBe(2);
  });

  it('should render result elements', () => {
    const results: Result[] = [{ playerName: 'Player1', counter: 10 }];

    component.results = results;
    fixture.detectChanges();

    const result = fixture.debugElement.query(By.css('p'));
    expect(result.nativeElement.innerHTML).toContain('Player1');
    expect(result.nativeElement.innerHTML).toContain('10');
  });
});
