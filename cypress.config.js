const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cucumber = require('cypress-cucumber-preprocessor').default


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      allureWriter(on, config);
      
      return config;
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/index.js'
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, @shelex/cypress-allure-plugin/reporter',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/results/mochawesome',
      overwrite: false,
      html: false,
      json: true
    },
    allureReporterOptions: {
      resultsDir: 'cypress/results/allure'
    }
  }
});
