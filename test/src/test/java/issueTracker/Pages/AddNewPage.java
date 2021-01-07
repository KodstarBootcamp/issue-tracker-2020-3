package issueTracker.Pages;

import issueTracker.Utilities.Driver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class AddNewPage {
    public AddNewPage(){
        PageFactory.initElements(Driver.getDriver(),this);
    }
    @FindBy(id = "title")
    public WebElement title;
    @FindBy(id = "description")
    public WebElement description;
    @FindBy(id = "labels")
    public WebElement labels;
    @FindBy(id = "createButton")
    public WebElement createButton;
    @FindBy(xpath = "//h2")
    public WebElement text;
}
