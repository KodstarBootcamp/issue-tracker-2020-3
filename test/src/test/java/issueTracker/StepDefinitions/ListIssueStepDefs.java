package issueTracker.StepDefinitions;

import io.cucumber.java.en.Then;
import issueTracker.Utilities.Pages;
import issueTracker.Utilities.ReusableMethods;
import org.junit.Assert;

public class ListIssueStepDefs {
    Pages pages = new Pages();
    ReusableMethods reusableMethods=new ReusableMethods();
    @Then("user should see created issue list on the page")
    public void userShouldSeeCreatedIssueListOnThePage() {
        reusableMethods.wait(3);
        Assert.assertTrue(pages.issueListPage().issueList.size()!=0);
    }
}
