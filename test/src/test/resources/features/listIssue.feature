@listTest @smokeTest
Feature: editing issue
  Scenario: user edits an issue
    Given user on the homepage
    And  user clicks on issue list button
    Then user should see created issue list on the page
