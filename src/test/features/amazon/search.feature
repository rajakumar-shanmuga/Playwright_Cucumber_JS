Feature: Amazon

 @amazon
  Scenario Outline: add an item to cart on amazon site
    Given navigate to "<appl>" application
    When search product name with "<searchKeyword>"
    When select desired "<item>"
    When select item desired color "<color>"
    When add to cart
    But with no protection
    When navigate to cart
    Then verify selected item is present on the cart

    Examples: 
      | searchKeyword | item            | color | appl   |
      | iphone        | Apple iPhone 13 | Pink  | amazon |
