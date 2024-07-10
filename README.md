# sause-labs-demo
## A. Description
This project is a demonstration of an automated test suite using Cypress with Cucumber for BDD, integrated with Allure for reporting. The tests cover basic user interactions on the Sauce Labs demo site, including logging in, selecting products, and checking out.

## B. Setup
Clone the repository:
## `git clone https://github.com/sinhaaman21/sause-labs-demo.git`

## `cd sause-labs-demo`

## C. Install dependencies:
`npm install`

## D. Running Tests

### 1. Run Cypress Tests and Generate Allure Results
`npx cypress run --browser electron --headed --env allure=true`

### 2. Serve Allure Report
`npx allure serve "cypress/results/allure"`

### 3. Open Cypress Test Runner
`npx cypress open`

## E. Test Framework Setup Description

### 1. Test Data
Test data is stored in 
`cypress/fixtures/testData.json` 
This file contains test data used during the checkout user journey.

### 2. Locators
All locators are defined in 
`cypress/support/locators.js`

### 3. Step Definitions
Step definitions are located in 
`cypress/e2e/Feature/step_definitions/steps.js`

### 4. Feature File
The feature file defining the test scenarios is located at 
`cypress/e2e/Feature/sauseLabs.feature`

### 5. Allure results
Allure results are located in 
`cypress/results/allure`
To view the allure report execute the below command
`npx allure serve "cypress/results/allure"`

### 6. Dependencies
Dependencies required are mentioned in `package.json`
To install all the dependencies execute `npm install` from the root folder

## F. Author
Aman Sinha









