import React,{useState} from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'

const App=() => {
  const [issues, setIssues] = useState([])
issueService.getAll().setIssues()
  
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
       
      </div>
  );
}

export default App;
