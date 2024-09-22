import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { GameFeature } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects';
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ResourceSelectorComponent } from './components/resource-selector/resource-selector.component';
import { ResourceElementsCountProvider, PeopleElementsCountProvider, StarshipElementsCountProvider } from './services/elements-count/elements-count.provider';
import { GameCardComponent } from './components/game-card/game-card.component';
import { PointsCounterComponent } from './components/points-counter/points-counter.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ValuePipe } from './pipes/value/value.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent, ResourceSelectorComponent, GameCardComponent, PointsCounterComponent, GameBoardComponent, ValuePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ game: GameFeature.reducer }),
    EffectsModule.forRoot([GameEffects]),
    MatSelectModule,
    MatCardModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
  providers: [
    ValuePipe,
    provideHttpClient(),
    {
      provide: ResourceElementsCountProvider,
      useClass: PeopleElementsCountProvider,
      multi: true,
    },
    {
      provide: ResourceElementsCountProvider,
      useClass: StarshipElementsCountProvider,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
