package issueTracker.Pages;

import issueTracker.Utilities.Driver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class IssueListPage {
    public IssueListPage() {
        PageFactory.initElements(Driver.getDriver(), this);
    }

    @FindBy(xpath = "//h1")
    public WebElement text;
    @FindBy(xpath = "//tbody//tr")
    public List<WebElement> rows;
    @FindBy(xpath = "//div[@class='info']")
    public WebElement message;
    @FindBy(id = "validationCustom01")
    public WebElement titleUpdate;
    @FindBy(xpath = "//button[@type='submit']")
    public WebElement updateButton;
    @FindBy(xpath = "//button[@class='btn btn-danger']")
    public WebElement cancelButton;
    @FindBy(id = "validationCustom02")
    public WebElement descriptionUpdate;
    @FindBy(id = "validationCustom03")
    public WebElement labelsUpdate;

    public static WebElement findingThead(String columnName) {
        int columnNumber = 0;
        switch (columnName) {
            case "title":
                columnNumber = 1;
            case "edit":
                columnNumber = 2;
            case "delete":
                columnNumber = 3;
            case "details":
                columnNumber = 4;
        }
        WebElement thead = Driver.getDriver().findElement(By.xpath("//thead//th[" + columnNumber + "]"));
        return thead;
    }

}