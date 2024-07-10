Feature: Sauce Demo Checkout Flow

  Scenario: Complete a successful checkout
    Given the user is on the Sauce Labs login page
    When the user logs in with valid credentials
    And the user selects 3 random items
    And the user proceeds to checkout
    And the user fills in their information
    And the user verifies the product details
    And the user completes the checkout
    Then the user should see a successful checkout message