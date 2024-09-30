import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ResourceSelectorComponent } from './resource-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { GameState } from '../../store/state';
import { Store } from '@ngrx/store';
import { GameActions } from '../../store/actions';
import { ResourceEnum } from '../../common/models/resource';

describe('ResourceSelectorComponent', () => {
  const initialState = {};
  let component: ResourceSelectorComponent;
  let fixture: ComponentFixture<ResourceSelectorComponent>;
  let store: Store<GameState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, BrowserAnimationsModule],
      declarations: [ResourceSelectorComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ResourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render three options', () => {
    const select = fixture.debugElement.query(By.css('mat-select'));
    select.nativeElement.click();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(3);
  });

  it('should dispatch action after click on People option', () => {
    spyOn(store, 'dispatch');

    const select = fixture.debugElement.query(By.css('mat-select'));
    select.nativeElement.click();
    fixture.detectChanges();

    const peopleOptions = fixture.debugElement.queryAll(By.css('mat-option'))[1];
    peopleOptions.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledOnceWith(GameActions.initialize({ resourceType: ResourceEnum.People }));
  });

  it('should not dispatch action after click on None option', () => {
    spyOn(store, 'dispatch');

    const select = fixture.debugElement.query(By.css('mat-select'));
    select.nativeElement.click();
    fixture.detectChanges();

    const peopleOptions = fixture.debugElement.queryAll(By.css('mat-option'))[0];
    peopleOptions.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
