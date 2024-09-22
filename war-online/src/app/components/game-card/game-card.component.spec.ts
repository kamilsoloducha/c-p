import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { MatCardModule } from '@angular/material/card';
import { ValuePipe } from '../../pipes/value/value.pipe';
import { By } from '@angular/platform-browser';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MatCardModule], declarations: [GameCardComponent, ValuePipe] }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redner all information', () => {
    component.cardName = 'Card Name';
    component.attributeName = 'Attribute Name';
    component.attributeValue = 100;

    fixture.detectChanges();

    var header = fixture.debugElement.query(By.css('mat-card-header'));
    expect(header.nativeElement.innerHTML).toContain('Card Name');

    var content = fixture.debugElement.query(By.css('mat-card-content'));
    expect(content.nativeElement.innerHTML).toContain('Attribute Name : 100');
  });
});
