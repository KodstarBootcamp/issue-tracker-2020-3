package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import issueTracker.Utilities.Driver;

public class Test {
    @Given("user on the {string}")
    public void user_on_the(String url) {
        Driver.getDriver().get(url);
    }
}
