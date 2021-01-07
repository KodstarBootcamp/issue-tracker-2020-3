@deleteTest @smokeTest
  Feature: deleting issue
    Scenario: user deletes an issue
      Given user on the homepage
      And  user clicks on issue list button
      And user selects "testing" to delete
      And user clicks on trash icon
      And user clicks on ok button on the popup
      Then user verify the success message

