package issueTracker.Pages;

import issueTracker.Utilities.Driver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    public  HomePage(){
        PageFactory.initElements(Driver.getDriver(), this);
    }
    @FindBy(xpath = "(//button[@class='btn-md  col-sm-6 col-md-12 btn btn-outline-success'])[1]")
    public WebElement addNewButton;
    @FindBy(xpath = "(//button[@class='btn-md  col-sm-6 col-md-12 btn btn-outline-success'])[2]")
    public WebElement issueListButton;
    @FindBy(xpath = "(//button[@class='btn-md  col-sm-6 col-md-12 btn btn-outline-success'])[3]")
    public WebElement removeButton;
    @FindBy(xpath = "//button[@class='btn-md  col-sm-6 col-md-12 btn btn-outline-danger']")
    public WebElement homePageButton;
}
