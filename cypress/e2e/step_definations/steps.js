import { Given, When, Then, After, And} from "cypress-cucumber-preprocessor/steps";
import { locators } from "../../support/locators";

Given('the user is on the Sauce Labs login page', () => {
  cy.visit('https://www.saucedemo.com/');
});