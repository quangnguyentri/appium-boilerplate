Feature: Google Search

    Scenario: Search Elfie keyword from google search page
        Given I am on google search page
        When I enter search keyword "Elfie" and click on first search result item
        Then I should see an Elfie page with logo display

    Scenario: Click on hamburger menu on Elfie page
        Given I am on Elfie page
        When I click on hamburger menu
        Then I should see x-menu display

    Scenario: Scroll to the copy right text on Elfie's footer page
        Given I am on Elfie page
        When I scroll to footer section
        Then I should see the copy right text

