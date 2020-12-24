import React,{useState} from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'
import ViewIssue from './components/ViewIssue'
import Navigation from './components/Navigation'

const App=() => {
  const [issues, setIssues] = useState([])
    //setIssues(issueService.getAll())
  
  const addIssue = (issueObject) => {
    console.log("Create Issue App.js",issueObject)
    issueService
      .create(issueObject)
      .then(returnedIssue => {
        setIssues(issues.concat(returnedIssue))
      })
  }

  return (
      <div className="container">
         <Navigation/>
          <CreateIssueForm createIssue={addIssue} />
          <ViewIssue />
        
       </div>
  );
}
//Router ekle
export default App;

/*

menüler
home  Issue list  Remove

*/
