import { MatCardModule } from '@angular/material/card';
import { ValuePipe } from '../../pipes/value/value.pipe';
import { GameCardComponent } from './game-card.component';

describe('GameCard', () => {
  it('mount', () => {
    cy.mount(GameCardComponent, {
      declarations: [ValuePipe],
      imports: [MatCardModule],
      componentProperties: {
        cardName: 'cardName',
        attributeName: 'attributeName',
        attributeValue: 20,
      },
    });
  });
});
