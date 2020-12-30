package issueTracker.Pages;

import issueTracker.Utilities.Driver;
import org.openqa.selenium.support.PageFactory;

public class RemovePage {
    public RemovePage(){
        PageFactory.initElements(Driver.getDriver(),this);
    }
}
