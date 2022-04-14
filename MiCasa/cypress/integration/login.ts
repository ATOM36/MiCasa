describe('Navigation tests', () => {
  it('Visits the admin page', () => {
    cy.fixture('../fixtures/admin.json')
      .then((adminData) => {
        assert.isObject(adminData, 'Données de test chargées');
        return adminData;
      })
      .then((res) => {
        assert.isNotNull(res.password, 'Admin password is not null');
        assert.isNotNull(res.username, 'Admin username is not null');
        cy.visit('/login');

        cy.get('#emailInput').focus().type(res.username);
        cy.get('#passwordInput').focus().type(res.password);

        cy.get('#goButton').click();
      })
      .then(() => {
        assert.exists(cy.get('app-toolbar'), 'Une toolbar existe');
      });
  });
});
