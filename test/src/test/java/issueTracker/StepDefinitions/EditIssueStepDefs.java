package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import issueTracker.Utilities.Driver;
import issueTracker.Utilities.Pages;
import issueTracker.Utilities.ReusableMethods;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class EditIssueStepDefs {
    Pages pages = new Pages();
    ReusableMethods reusableMethods =new ReusableMethods();
    Actions actions = new Actions(Driver.getDriver());
    int row;
    @Given("user selects {string} to edit")
    public void user_selects_to_edit(String title) {
        reusableMethods.wait(2);
        for (int i = 0; i < pages.issueListPage().rows.size(); i++) {
            if (pages.issueListPage().rows.get(i).getText().equals(title)) {
                JavascriptExecutor js = (JavascriptExecutor) Driver.getDriver();
                row = i+1;
                WebElement actualTitle = Driver.getDriver().findElement(By.xpath("//tbody//tr[" + row + "]"));
                js.executeScript("arguments[0].scrollIntoView(true);", actualTitle);
                js.executeScript("arguments[0].setAttribute('style', 'background: yellow; border: 2px solid red;');", actualTitle);
            }
        }

    }

    @Given("user clicks on pencil icon")
    public void user_clicks_on_pencil_icon() {
        reusableMethods.wait(2);
        String xpath = "(//tbody//tr["+ row + "]//td[2]//*[name()='svg']/*[name()='path'])[1]";
        WebElement pen = Driver.getDriver().findElement(By.xpath(xpath));
        actions.click(pen).build().perform();
        actions.sendKeys(Keys.PAGE_DOWN);

    }

    @Given("user clears title")
    public void user_clears_title() {
        reusableMethods.wait(2);
        pages.issueListPage().titleUpdate.clear();
    }

    @Given("user enters {string} in to title textbox")
    public void user_enters_in_to_title_textbox(String newTitle) {
        reusableMethods.wait(2);
        reusableMethods.waitAndSendText(pages.issueListPage().titleUpdate, newTitle,2);
    }

    @Given("user clicks on update button")
    public void user_clicks_on_update_button() {
        reusableMethods.wait(2);
        reusableMethods.waitAndClick(pages.issueListPage().updateButton, 2);
    }

    @Then("verify that success message is displayed")
    public void verify_that_success_message_is_displayed() {
        reusableMethods.wait(2);
        Assert.assertTrue(pages.issueListPage().message.isDisplayed());

    }
}
