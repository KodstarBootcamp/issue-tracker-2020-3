@editTest @smokeTest
  Feature: editing issue
    Scenario: user edits an issue
      Given user on the homepage
      And  user clicks on issue list button
      And user selects "new test issue" to edit
      And user clicks on pencil icon
      And user clears title
      And user enters "edited test issue" in to title textbox
      And user clicks on update button
      Then verify that success message is displayed


