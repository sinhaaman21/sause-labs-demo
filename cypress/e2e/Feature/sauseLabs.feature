Feature: Sauce Demo Checkout Flow

  Scenario: Complete a successful checkout
    Given User is on the Sauce Labs login page
    When User logs in with valid credentials
    And User selects 3 random items
    And User proceeds to checkout
    And User fills in their information
    And User verifies the product details
    And User completes the checkout
    Then User should see a successful checkout message