package issueTracker.Pages;

import issueTracker.Utilities.Driver;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    public  HomePage(){
        PageFactory.initElements(Driver.getDriver(), this);
    }
}
