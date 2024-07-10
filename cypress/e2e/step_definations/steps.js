import { Given, When, Then, After, And} from "cypress-cucumber-preprocessor/steps";
import { locators } from "../../support/locators";

let testData;

before(() => {
  cy.fixture('testData').then((data) => {
    testData = data;
  });
});

Given('the user is on the Sauce Labs login page', () => {
  cy.visit(testData.baseUrl);
});

When('the user logs in with valid credentials', () => {
  cy.get(locators.username).type(testData.username);
  cy.get(locators.password).type(testData.password);
  cy.get(locators.loginButton).click();
  cy.url().should('include', testData.homePageUrl);
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
  cy.url().should('include', testData.cartUrl);
  cy.get(locators.checkoutButton).should('be.visible').click();
  cy.url().should('include', testData.checkoutStepOneUrl);
});

When('the user fills in their information', () => {
  cy.get(locators.firstName).type(testData.firstName);
  cy.get(locators.lastName).type(testData.lastName);
  cy.get(locators.postalCode).type(testData.postalCode);
  cy.get(locators.continueButton).click();
  cy.url().should('include', testData.checkoutStepTwoUrl);
});

When('the user completes the checkout', () => {
  cy.get(locators.finishButton).click();
  cy.url().should('include', testData.checkoutCompleteUrl);
});

Then('the user should see a successful checkout message', () => {
  cy.get(locators.completeHeader).should('contain', testData.checkoutMsg);
});