import { Given, When, Then, After, And} from "cypress-cucumber-preprocessor/steps";
import { locators } from "../../support/locators";

Given('the user is on the Sauce Labs login page', () => {
  cy.visit('https://www.saucedemo.com/');
});

When('the user logs in with valid credentials', () => {
  cy.get(locators.username).type('standard_user');
  cy.get(locators.password).type('secret_sauce');
  cy.get(locators.loginButton).click();
  cy.url().should('include', '/inventory.html');
});

When('the user selects 3 random items', () => {
  cy.get(locators.inventoryItem).should('have.length.at.least', 3).then(items => {
    const itemsToSelect = Cypress._.sampleSize(items.toArray(), 3);
    itemsToSelect.forEach(item => {
      cy.wrap(item).find('button').click();
      cy.wrap(item).find('button').should('contain', 'Remove');
    });
  });
});

When('the user proceeds to checkout', () => {
  cy.get(locators.cartLink).click();
  cy.url().should('include', '/cart.html');
  cy.get(locators.checkoutButton).should('be.visible').click();
  cy.url().should('include', '/checkout-step-one.html');
});

When('the user fills in their information', () => {
  cy.get(locators.firstName).type('John');
  cy.get(locators.lastName).type('Doe');
  cy.get(locators.postalCode).type('12345');
  cy.get(locators.continueButton).click();
  cy.url().should('include', '/checkout-step-two.html');
});

When('the user completes the checkout', () => {
  cy.get(locators.finishButton).click();
  cy.url().should('include', '/checkout-complete.html');
});

Then('the user should see a successful checkout message', () => {
  cy.get(locators.completeHeader).should('contain', 'Thank you for your order!');
});