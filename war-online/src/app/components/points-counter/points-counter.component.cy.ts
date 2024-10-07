import { Result } from '../../common/models/results';
import { PointsCounterComponent } from './points-counter.component';

describe('PointsCounter', () => {
  const results: Result[] = [
    { playerName: 'player1', counter: 1 },
    { playerName: 'player2', counter: 2 },
  ];

  it('mounts', () => {
    cy.mount(PointsCounterComponent, {
      componentProperties: {
        results,
      },
    });

    cy.get('h6').should('contain.text', 'Results:');

    cy.get('p')
      .should('have.length', 2)
      .each((el, index) => {
        expect(el.html()).contains(results[index].counter).contains(results[index].playerName);
      });
  });
});
