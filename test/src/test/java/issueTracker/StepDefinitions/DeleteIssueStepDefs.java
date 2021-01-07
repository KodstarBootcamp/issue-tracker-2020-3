package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import issueTracker.Utilities.Pages;

public class DeleteIssueStepDefs {
    Pages pages = new Pages();
    @Given("user clicks on remove button")
    public void user_clicks_on_remove_button() {
        pages.homePage().removeButton.click();
    }


}
