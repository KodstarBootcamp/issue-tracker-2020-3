@createTest
  Feature: Create
    Scenario: user creates new issue
      Given user on the homepage
      And user clicks on add new button
      And user is directed to "Create a new issue" page
      And user enters "new issue"
      And user enters description
      And user enters labels
      And user clicks on create new issue button
      Then verify that issue list has "new issue"
