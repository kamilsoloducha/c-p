describe('template spec', () => {
  let reqNo = 0;

  beforeEach(() => {
    cy.intercept('GET', 'https://www.swapi.tech/api/people', {
      body: { total_records: 1 },
    });

    cy.intercept('GET', 'https://www.swapi.tech/api/people?page=1&limit=1', {
      body: { results: [{ uid: '1' }] },
    });

    const responses = [
      {
        result: {
          properties: {
            mass: '1',
            name: 'test1',
          },
        },
      },
      {
        result: {
          properties: {
            mass: '2',
            name: 'test2',
          },
        },
      },
      {
        result: {
          properties: {
            mass: '3',
            name: 'test3',
          },
        },
      },
      {
        result: {
          properties: {
            mass: '4',
            name: 'test4',
          },
        },
      },
    ];

    cy.intercept('GET', 'https://www.swapi.tech/api/people/1', (req) => {
      req.reply(responses[reqNo++]);
    });
  });

  it('passes', () => {
    cy.visit('http://localhost:4200/');

    cy.get('mat-form-field').click();

    cy.contains('mat-option', 'People').click();

    cy.contains('button', 'Next battle').click();
  });
});
