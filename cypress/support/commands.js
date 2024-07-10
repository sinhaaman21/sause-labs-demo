Cypress.Commands.add('login', (locators, username, password) => {
    cy.get(locators.username).type(username);
    cy.get(locators.password).type(password);
    cy.get(locators.loginButton).click();
  });
  
  Cypress.Commands.add('fillCheckoutForm', (locators, firstName, lastName, postalCode) => {
    cy.get(locators.firstName).type(firstName);
    cy.get(locators.lastName).type(lastName);
    cy.get(locators.postalCode).type(postalCode);
    cy.get(locators.continueButton).click();
  });
  