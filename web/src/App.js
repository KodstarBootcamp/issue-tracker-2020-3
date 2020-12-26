import React,{useState} from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'
import ViewIssue from './components/ViewIssue'
import Navigation from './components/Navigation'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useHistory
} from "react-router-dom";
import Info from './components/Info';

const App=() => {
  const history = useHistory()
  const [issues, setIssues] = useState([])
  const [infoMessage,setInfoMessage]=useState(null)
    //setIssues(issueService.getAll())
  
  const addIssue = (issueObject) => {
    console.log("Create Issue App.js",issueObject)
    issueService
      .create(issueObject)
      .then(returnedIssue => {
        setIssues(issues.concat(returnedIssue))
        setInfoMessage(`a new issue ${returnedIssue.title} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        history.push('/issuelist')
      })
  }
  return (
      <div className="container">
        <Navigation />
        <Info message={infoMessage} />
          <Switch>
            <Route exact path="/addnew">
              <CreateIssueForm createIssue={addIssue} />
            </Route>
            <Route exact path="/issuelist">
              <ViewIssue setInfoMessage={setInfoMessage}/>
            </Route>
            <Route exact path="/">
            </Route>
      </Switch>
       </div>
  );
}
//Router ekle
export default App;

/*
menüler
home  Issue list  Remove
*/