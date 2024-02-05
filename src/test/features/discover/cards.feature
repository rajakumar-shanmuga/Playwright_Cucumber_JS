Feature: Discover

  @discover
  Scenario: apply credit cards flow1
    Given navigate to "discover" application
    When navigate to credit cards
    When apply student cash back credit card
    When select american flag card design
    Then verify card design is selected correctly
    Then no credit score required section is present

  @fail
  Scenario: apply credit cards flow2
    Given navigate to "amazon" application
    When navigate to credit cards