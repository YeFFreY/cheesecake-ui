describe('The Login page', () => {
  it('successfully authenticate user and redirect to home page', () => {
    cy.visit('/login');

    cy.get('input#email').clear().type('eve.holt@reqres.in');
    cy.get('input#password').clear().type('cityslicka');
    cy.get('button[type=submit]').click();

    cy.url().should('equal', 'http://localhost:4200/')
  })
})
