package issueTracker.Utilities;

import issueTracker.Pages.AddNewPage;
import issueTracker.Pages.HomePage;
import issueTracker.Pages.IssueListPage;
import issueTracker.Pages.RemovePage;

public class Pages {
    private AddNewPage addNewPage;
    private HomePage homePage;
    private IssueListPage issueListPage;
    private RemovePage removePage;

    public AddNewPage addNewPage(){
        if(addNewPage==null){
            addNewPage = new AddNewPage();
        }
        return addNewPage;
    }
    public HomePage homePage(){
        if(homePage==null){
            homePage = new HomePage();
        }
        return homePage;
    }
    public IssueListPage issueListPage(){
        if (issueListPage==null){
            issueListPage=new IssueListPage();
        }
        return issueListPage;
    }
    public RemovePage removePage(){
        if(removePage==null){
            removePage=new RemovePage();
        }
        return removePage;
    }

}
