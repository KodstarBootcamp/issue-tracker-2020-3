package issueTracker.StepDefinitions;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import issueTracker.Utilities.Driver;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;


public class Hooks {
    @Before(order = 1)//it runs before all and every each one of scenario
    public void setUp(){
    }

    @After
    public void tearDown(Scenario scenario){
        //it takes screen hots and works on TestNG and cucumber framework
        final byte [] screenshot = ((TakesScreenshot) Driver.getDriver()).getScreenshotAs(OutputType.BYTES);
        if (scenario.isFailed()) {
            scenario.embed(screenshot, "image/png");
        }
        Driver.closeDriver();
    }
}
