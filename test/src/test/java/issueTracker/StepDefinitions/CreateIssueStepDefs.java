package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import issueTracker.Utilities.ConfigReader;
import issueTracker.Utilities.Driver;
import issueTracker.Utilities.Pages;
import javafx.beans.value.WeakChangeListener;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

public class CreateIssueStepDefs {
    Pages pages = new Pages();

    @Given("user on the homepage")
    public void user_on_the_homepage() {
        Driver.getDriver().get(ConfigReader.getProperty("homepage"));
    }

    @Given("user clicks on add new button")
    public void user_clicks_on_add_new_button() {
        pages.homePage().addNewButton.click();
    }

    @Given("user is directed to {string} page")
    public void user_is_directed_to_page(String string) {
        Assert.assertTrue(pages.addNewPage().text.isDisplayed());
    }

    @Given("user enters {string}")
    public void user_enters(String title) {
        pages.addNewPage().title.sendKeys(title);
    }

    @Given("user enters description")
    public void user_enters_description() {
        pages.addNewPage().description.sendKeys("test desc");
    }

    @Given("user enters labels")
    public void user_enters_labels() {
        pages.addNewPage().labels.sendKeys("labels test");
    }

    @Given("user clicks on create new issue button")
    public void user_clicks_on_create_new_issue_button() {
        pages.addNewPage().createButton.click();
    }
    @Then("verify that issue list has {string}")
    public void verify_that_issue_list_has(String title) {
        List<String> rowText= new ArrayList<>();
        for (int i=0;i<pages.issueListPage().rows.size();i++){
            rowText.add(pages.issueListPage().rows.get(i).getText());
            System.out.println(pages.issueListPage().rows.get(i).getText());
            if(pages.issueListPage().rows.get(i).getText().equals(title)){
                JavascriptExecutor js = (JavascriptExecutor)Driver.getDriver();
                int row = i+1;
                WebElement actualTitle = Driver.getDriver().findElement(By.xpath("//tbody//tr["+row+"]"));
                js.executeScript("arguments[0].setAttribute('style', 'background: yellow; border: 2px solid green;');", actualTitle);
                System.out.println(i);
            }
        }
        Assert.assertTrue("Creation failure", rowText.contains(title));


    }

}
