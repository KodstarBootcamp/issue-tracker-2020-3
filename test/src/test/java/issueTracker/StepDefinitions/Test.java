package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import issueTracker.Pages.HomePage;
import issueTracker.Utilities.ConfigReader;
import issueTracker.Utilities.Driver;

public class Test {
    HomePage homePage = new HomePage();
    @Given("user on the home page")
    public void user_on_the_home_page() {
        Driver.getDriver().get(ConfigReader.getProperty("uiurl"));
    }
    @Given("user clicks issueList button")
    public void user_clicks_issueList_button() {
        homePage.issueListButton.click();
    }

}
