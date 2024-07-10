import { Given, When, Then, After, And} from "cypress-cucumber-preprocessor/steps";
import { locators } from "../../support/locators";

let testData;
let selectedProducts = [];


before(() => {
  cy.fixture('testData').then((data) => {
    testData = data;
  });
});

Given('the user is on the Sauce Labs login page', () => {
  cy.visit(testData.baseUrl);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

When('the user logs in with valid credentials', () => {
  cy.get(locators.username).type(testData.username);
  cy.get(locators.password).type(testData.password);
  cy.get(locators.loginButton).click();
  cy.url().should('include', testData.homePageUrl);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

When('the user selects 3 random items', () => {
  cy.get(locators.inventoryItem).should('have.length.at.least', 3).then(items => {
    const itemsToSelect = Cypress._.sampleSize(items.toArray(), 3);
    itemsToSelect.forEach(item => {
      cy.wrap(item).find(locators.productName).invoke('text').then(productName => {
        cy.wrap(item).find(locators.productPrice).invoke('text').then(productPrice => {
          cy.wrap(item).find(locators.addToCartButton).click();
          cy.wrap(item).find(locators.removeButton).should('be.visible');
          selectedProducts.push({
            name: productName,
            price: productPrice
          });
        });
      });
    });
  });
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

When('the user proceeds to checkout', () => {
  cy.get(locators.cartLink).click();
  cy.url().should('include', testData.cartUrl);
  cy.get(locators.checkoutButton).should('be.visible').click();
  cy.url().should('include', testData.checkoutStepOneUrl);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

When('the user fills in their information', () => {
  cy.get(locators.firstName).type(testData.firstName);
  cy.get(locators.lastName).type(testData.lastName);
  cy.get(locators.postalCode).type(testData.postalCode);
  cy.get(locators.continueButton).click();
  cy.url().should('include', testData.checkoutStepTwoUrl);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

When('the user verifies the product details', () => {
  selectedProducts.forEach(product => {
    cy.contains(product.name).should('be.visible');
    cy.contains(product.price).should('be.visible');
    cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
  });
});

When('the user completes the checkout', () => {
  cy.get(locators.finishButton).click();
  cy.url().should('include', testData.checkoutCompleteUrl);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});

Then('the user should see a successful checkout message', () => {
  cy.get(locators.completeHeader).should('contain', testData.checkoutMsg);
  cy.wait(3000) // Adding so that we can view the execution - This can be removed to speed up the execution
});