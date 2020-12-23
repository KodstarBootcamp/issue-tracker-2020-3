import React,{useState} from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'
import ViewIssue from './components/ViewIssue'

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
          <CreateIssueForm createIssue={addIssue} />
          <ViewIssue />
        
       </div>
  );
}

export default App;

/*

menüler
home  new 

-------------x edit delete
----------- edit delete 
-------------- edit delete 

edit-update
delete

*/
